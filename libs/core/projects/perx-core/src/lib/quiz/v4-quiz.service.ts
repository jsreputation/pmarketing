import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable, of,
  ReplaySubject,
  Subject
} from 'rxjs';
import {
  catchError,
  map,
  switchMap
} from 'rxjs/operators';
import { oc } from 'ts-optchain';
import { Asset } from '../game/v4-game.service';
import {
  IQAnswer,
  IQuiz,
  IQuizOutcome,
  ITimeConfig,
  QuizMode,
  QuizQuestionType,
  TimerType,
  IQuizResultOutcome
} from './models/quiz.model';
import {
  IAnswerResult,
  IQQuestion,
  QuizService
} from './quiz.service';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/models/config.model';
import { patchUrl } from '../utils/patch-url.function';
import { Cacheable } from 'ngx-cacheable';
import { OutcomeType } from '../outcome/models/outcome.model';
import {
  IV4Voucher,
  V4VouchersService
} from '../vouchers/v4-vouchers.service';
import { V4CampaignService, IV4PointsOutcome, IV4BadgeOutcome } from '../campaign/v4-campaign.service';
import { V4PrizeSetOutcomeService, IV4PrizeSetOutcome } from '../prize-set-outcome/v4-prize-set-outcome.service';

const enum V4QuizMode {
  basic = 'basic',
  swipe = 'swipe',
  elimination = 'elimination'
}

export interface QuizDisplayProperties {
  title: string;
  questions: {
    question: { [k: string]: { text: string } };
    description: { [k: string]: { text: string } };
    id: string;
    required: boolean;
    payload: any;
  }[];
  landing_page: {
    body: { en: { text: string } };
    media?: { youtube?: string; };
    button_text: { en: { text: string } };
  };
  background_image?: Asset;
  card_image?: Asset;
  quiz_interaction: V4QuizMode;
  header?: {
    value?: {
      title?: { [k: string]: { text: string } };
      description?: { [k: string]: { text: string } };
    };
  };
  timer_count: number;
  timer_enabled: boolean;
  timer_type: TimerType;
  nooutcome?: {
    title?: string;
    description?: string;
    button_text?: string;
  };
  outcome?: {
    title?: string;
    description?: string;
    button_text?: string;
    outcome_image: Asset;
  };
  cta_button_colour?: string;
  cta_button_text_colour?: string;
  font_colour?: string;
}

interface V4NextMoveResponse {
  data: {
    acquired_via: string;
    id: number;
    user_account_id: number;
    state: string;
    campaign_id: number;
    game_id: number;
    outcomes: any[],
    reason: null;
    issued_at: string;
    created_by_type: string;
    created_by_id: number;
    expiry_date: null | string;
    answers: any[];
  };
}

interface V4QuizAnswerRequest {
  answer: V4AnswerRequest;
}

interface V4AnswerRequest {
  question_id: string;
  answer_ids: (string | number)[];
  time_taken: number;
}

interface V4AnswerResponse extends V4AnswerRequest {
  is_correct: boolean;
  score: number;
}

interface V4QuizAnswerResponse {
  data: {
    id: number;
    user_account_id: 321;
    state: string;
    campaign_id: number;
    game_id: number;
    // move_params: {
    answers: V4AnswerResponse[];
    // };
    outcomes: any[];
  };
}

interface V4Game {
  id: number;
  user_account_id: number;
  state: null;
  campaign_id: number;
  game_type: string;
  display_properties: QuizDisplayProperties;
  number_of_tries: number;
}

interface V4GamesResponse {
  data: V4Game[];
  meta: {
    count: number;
    size: number;
    page: number;
    current_page: number;
    per_page: number;
    prev_page: null;
    next_page: null;
    total_pages: number;
    total_count: number;
  };
}
@Injectable({
  providedIn: 'root'
})
export class V4QuizService implements QuizService {
  private baseUrl$: Subject<string> = new ReplaySubject(1);
  private lang: string;

  constructor(
    private http: HttpClient,
    configService: ConfigService
  ) {
    configService.readAppConfig().subscribe(
      (config: IConfig<any>) => this.baseUrl$.next(config.apiHost));
  }

  @Cacheable({})
  public getQuizFromCampaign(campaignId: number, lang: string = 'en'): Observable<IQuiz> {
    lang = this.lang ? this.lang : lang;
    return this.baseUrl$.pipe(
      switchMap(baseUrl => this.http.get<V4GamesResponse>(`${baseUrl}/v4/campaigns/${campaignId}/games`)),
      map((res) => res.data),
      map((games: V4Game[]) => {
        if (games.length === 0) {
          throw new Error(`No available game for this campaign #${campaignId}`);
        }
        return games[0];
      }),
      map((game: V4Game): IQuiz => {
        const mode = V4QuizService.v2Mode2Mode(game.display_properties.quiz_interaction);
        const questions: IQQuestion[] = game.display_properties.questions.map(question => {
          const payload = { ...question.payload };
          if (payload.type === 'select') {
            payload.choices = payload.choices.map(choice => ({
              title: choice.answer[lang] || choice.answer.en,
              id: choice.answer_id
            }));
            if (mode === QuizMode.swipe) {
              payload.type = QuizQuestionType.swipeSelect;
            }
            if (mode === QuizMode.elimination) {
              payload.type = QuizQuestionType.swipeDelete;
            }
          }

          return {
            id: question.id,
            question: question.question[lang] || question.question.en,
            description: question.description ? question.description[lang] : oc(question).description.en(),
            required: question.required,
            payload
          };
        });
        let outcome: IQuizOutcome | undefined;
        if (oc(game).display_properties.outcome.title() ||
          oc(game).display_properties.outcome.description() ||
          oc(game).display_properties.outcome.button_text() ||
          oc(game).display_properties.outcome.outcome_image.value.image_url()) {
          outcome = {
            title: oc(game).display_properties.outcome.title(''),
            subTitle: oc(game).display_properties.outcome.description(''),
            button: oc(game).display_properties.outcome.button_text(''),
            image: oc(game).display_properties.outcome.outcome_image.value.image_url('')
          };
        }
        let noOutcome: IQuizOutcome | undefined;
        if (oc(game).display_properties.nooutcome.title() ||
          oc(game).display_properties.nooutcome.description() ||
          oc(game).display_properties.nooutcome.button_text()) {
          noOutcome = {
            title: oc(game).display_properties.nooutcome.title(''),
            subTitle: oc(game).display_properties.nooutcome.description(''),
            button: oc(game).display_properties.nooutcome.button_text('')
          };
        }
        const timeConfig: ITimeConfig = {};
        if (oc(game).display_properties.timer_enabled()) {
          // set defaults if timer_enabled and for some case cant fetch the type and count property (unlikely)
          timeConfig.timerType = oc(game).display_properties.timer_type(TimerType.countDown);
          timeConfig.timerCountSeconds = oc(game).display_properties.timer_count(120);
        }
        return {
          id: game.id,
          campaignId: game.campaign_id,
          // need to typecast directly because library return TSOC type, will resolve and be clean when update angular w/
          // TS optional chaining
          title: (oc(game).display_properties.header.value.title() ?
            oc(game).display_properties.header.value.title[lang]() :
            oc(game).display_properties.header.value.title.en()) as { text: string },
          subTitle: (oc(game).display_properties.header.value.description() ?
            oc(game).display_properties.header.value.description[lang]() :
            oc(game).display_properties.header.value.description.en()) as { text: string },
          results: {
            outcome,
            noOutcome
          },
          questions,
          mode,
          backgroundImgUrl: patchUrl(oc(game).display_properties.background_image.value.image_url('')),
          cardBackgroundImgUrl: patchUrl(oc(game).display_properties.card_image.value.image_url('')),
          remainingNumberOfTries: game.number_of_tries,
          timeConfig,
          ctaButtonBGColor: oc(game)?.display_properties?.cta_button_colour() ?
            oc(game)?.display_properties?.cta_button_colour() : undefined,
          ctaButtonTextColor: oc(game)?.display_properties?.cta_button_text_colour() ?
            oc(game)?.display_properties?.cta_button_text_colour() : undefined,
            fontColor: oc(game)?.display_properties?.font_colour() ? oc(game)?.display_properties?.font_colour() : undefined
        };
      })
    );
  }

  public getMove(gameId: number): Observable<{ moveId: number; }> {
    return this.baseUrl$.pipe(
      switchMap(baseUrl => this.http.post<V4NextMoveResponse>(`${baseUrl}/v4/games/${gameId}/next_move`, null)),
      map((api) => ({ moveId: api.data.id }))
    );
  }

  public postFinalQuizAnswer(moveId: number): Observable<IQuizResultOutcome> {
    // idk what thing is returned yet, i will see and then maybe map it into IAnswerResult
    // dk what is returned bcz keep fail
    return this.baseUrl$.pipe(
      switchMap(baseUrl => this.http.put<V4QuizAnswerResponse>(`${baseUrl}/v4/game_transactions/${moveId}/finish`, {})),
      map((answerResponse: V4QuizAnswerResponse) => {
        const v4Vouchers = answerResponse.data.outcomes.filter(outcome => outcome.id &&
          outcome.outcome_type === OutcomeType.reward) as IV4Voucher[];
        const v4Points = answerResponse.data.outcomes.filter(outcome =>
          outcome.id && outcome.outcome_type === OutcomeType.points) as IV4PointsOutcome[];
        const v4PrizeSets = answerResponse.data.outcomes.filter(outcome => outcome.id &&
          outcome.outcome_type === OutcomeType.prizeSet) as IV4PrizeSetOutcome[];
        const v4Badges = answerResponse.data.outcomes.filter(badge => badge.id &&
          badge.outcome_type === OutcomeType.badge) as IV4BadgeOutcome[];
        const vouchers = v4Vouchers.map(voucher => V4VouchersService.v4VoucherToVoucher(voucher));
        const points = v4Points.map(point => V4CampaignService.v4PointsToPoints(point));
        const prizeSets = v4PrizeSets.map(prizeSet => V4PrizeSetOutcomeService.v4PrizeSetOutcomeToPrizeSetOutcome(prizeSet));
        const badges = v4Badges.map(badge => V4CampaignService.v4BadgeToBadge(badge));
        const isRewardAcquired: boolean = (
          (vouchers?.length > 0)
          || (points?.length > 0)
          || (prizeSets?.length > 0)
          || (badges?.length > 0)) ? true : false;
        if (answerResponse.data.outcomes && answerResponse.data.outcomes.length) {
          return {
            rewardAcquired: isRewardAcquired,
            ...(vouchers?.length && { vouchers }),
            ...(points && { points }),
            ...(prizeSets && { prizeSets }),
            ...(badges && { badges }),
          };
        }
        return { rewardAcquired: false };
      }),
      catchError(_ => of({ rewardAcquired: false }))
    );
  }

  public postQuizAnswer(answer: IQAnswer, moveId: number): Observable<IAnswerResult> {
    const payload: V4QuizAnswerRequest = {
      answer: {
        question_id: answer.questionId,
        answer_ids: answer.content,
        time_taken: answer.timeTaken || -1
      }
    };
    return this.baseUrl$.pipe(
      switchMap(baseUrl => this.http.put<V4QuizAnswerResponse>(`${baseUrl}/v4/game_transactions/${moveId}/answer`, payload)),
      map(res => {
        const result: V4AnswerResponse | undefined = res.data.answers.find(ans => answer.questionId === ans.question_id);
        const points: number = oc(result).score(oc(result).is_correct() ? 1 : 0) || 0;
        return {
          hasOutcomes: res.data.outcomes.length > 0,
          points
        };
      })
    );
  }

  private static v2Mode2Mode(mode: V4QuizMode): QuizMode {
    if (mode === V4QuizMode.swipe) {
      return QuizMode.swipe;
    }
    if (mode === V4QuizMode.elimination) {
      return QuizMode.elimination;
    }
    return QuizMode.basic;
  }
}
