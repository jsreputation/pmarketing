import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  Observable,
  ReplaySubject,
  Subject
} from 'rxjs';
import {
  map,
  switchMap
} from 'rxjs/operators';
import { oc } from 'ts-optchain';
import { Asset } from '../game/v4-game.service';
import {
  IQAnswer,
  IQQuestion,
  IQuiz,
  IQuizOutcome,
  QuizMode,
  QuizQuestionType
} from './models/quiz.model';
import {
  IAnswerResult,
  QuizService
} from './quiz.service';
import { ConfigService } from '../config/config.service';
import { IConfig } from '../config/models/config.model';
import { patchUrl } from '../utils/patch-url.function';

const enum V4QuizMode {
  basic = 'basic',
  swipe = 'swipe',
  elimination = 'elimination'
}

export interface QuizDisplayProperties {
  title: string;
  questions: {
    question: { [k: string]: string };
    description: { [k: string]: string };
    id: string;
    required: boolean;
    payload: any;
  }[];
  landing_page: {
    body: string;
    media?: { youtube?: string; };
    heading: string;
    button_text: string;
    sub_heading: string;
  };
  background_image?: Asset;
  card_image?: Asset;
  quiz_interaction: V4QuizMode;
  header?: {
    value?: {
      title?: string;
      description?: string;
    };
  };
  headline_text?: string;
  body_text?: string;
  button_text?: string;
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

export type countObject = {
  count: number;
};

@Injectable({
  providedIn: 'root'
})
export class V4QuizService implements QuizService {
  private baseUrl$: Subject<string> = new ReplaySubject(1);

  constructor(
    private http: HttpClient,
    configService: ConfigService
  ) {
    configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.baseUrl$.next(config.apiHost);
      });
  }

  public getRewardFromCampaign(campaignId: number): Observable<{ count: number; campaignId: number }> {
    return this.baseUrl$.pipe(
      switchMap(baseUrl => this.http.get(`${baseUrl}/v4/campaigns/${campaignId}/voucher_count`)),
      map((res: {data: countObject}) => res.data),
      map((countObj: countObject) => ({...countObj, campaignId})),
    );
  }

  public getQuizFromCampaign(campaignId: number, lang: string = 'en'): Observable<IQuiz> {
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
        if (oc(game).display_properties.headline_text() ||
          oc(game).display_properties.body_text() ||
          oc(game).display_properties.button_text()) {
          outcome = {
            title: oc(game).display_properties.headline_text(''),
            subTitle: oc(game).display_properties.body_text(''),
            button: oc(game).display_properties.button_text('')
          };
        }
        return {
          id: game.id,
          campaignId: game.campaign_id,
          title: oc(game).display_properties.header.value.title(''),
          subTitle: oc(game).display_properties.header.value.description(),
          results: {
            outcome
          },
          questions,
          mode,
          backgroundImgUrl: patchUrl(oc(game).display_properties.background_image.value.image_url('')),
          cardBackgroundImgUrl: patchUrl(oc(game).display_properties.card_image.value.image_url('')),
          remainingNumberOfTries: game.number_of_tries
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

  public postQuizAnswer(answer: IQAnswer, moveId: number): Observable<IAnswerResult> {
    const payload: V4QuizAnswerRequest = {
      answer: {
        question_id: answer.questionId,
        answer_ids: answer.content,
        time_taken: answer.timeTaken || -1
      }
    };
    return this.baseUrl$.pipe(
      switchMap(baseUrl => this.http.put<V4QuizAnswerResponse>(`${baseUrl}/v4/game_transactions/${moveId}/answer_quiz`, payload)),
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
