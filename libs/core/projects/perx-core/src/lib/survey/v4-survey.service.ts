import { Injectable } from '@angular/core';
import { IConfig } from '../config/models/config.model';
import { ConfigService } from '../config/config.service';
import { IAnswer, ISurvey, ISurveyOutcome, SurveyQuestionType, ISurveyResultOutcome } from './models/survey.model';
import { SurveyService } from './survey.service';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';
import { catchError, map, switchMap } from 'rxjs/operators';
import { oc } from 'ts-optchain';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { patchUrl } from '../utils/patch-url.function';
import { Asset } from '../game/v4-game.service';
import { OutcomeType } from '../outcome/models/outcome.model';
import {
  IV4Voucher,
  V4VouchersService
} from '../vouchers/v4-vouchers.service';
import { V4CampaignService, IV4PointsOutcome, IV4BadgeOutcome } from '../campaign/v4-campaign.service';
import { V4PrizeSetOutcomeService, IV4PrizeSetOutcome } from '../prize-set-outcome/v4-prize-set-outcome.service';

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
    answers: V4SurveyAnswer[];
  };
}

interface V4SurveyAnswerRequest {
  answer: V4SurveyAnswer;
}

export interface V4SurveyAnswer {
  question_id: string;
  content: (string | number)[] | string;
}

export interface IV4SurveyResponse {
  data: {
    display_properties: IV4SurveyDisplayProperties;
  };
}

interface IV4Survey {
  id?: number;
  campaignId?: number;
  title?: { text: string };
  subTitle?: { text: string };
  display_properties?: IV4SurveyDisplayProperties;
}

interface IV4SurveyDisplayProperties {
  title: string;
  questions: IV4SurveyQuestion[];
  landing_page: {
    body: string;
    media?: { youtube?: string; };
    heading: string;
    button_text: string;
    sub_heading: string;
  };
  background_image?: Asset;
  card_image?: Asset;
  header?: {
    value?: {
      title?: { [k: string]: { text: string } };
      description?: { [k: string]: { text: string } };
    };
  };
  headline_text?: string;
  body_text?: string;
  button_text?: string;
  outcome?: IV4SurveyOutcome;
  nooutcome?: IV4SurveyOutcome;
  CTA_button_bg_color?: string;
  CTA_button_text_color?: string;
}

interface IV4SurveyOutcome {
  title: { [k: string]: { text: string } };
  button_text: { [k: string]: { text: string } };
  description: { [k: string]: { text: string } };
  outcome_image?: { value: { image_url: string } };
}

interface IV4SurveyQuestion {
  question: { [k: string]: ({ text: string } & { image: { value: { image_url: string } } }) };
  description: { [k: string]: { text: string } };
  id: string;
  required: boolean;
  payload: any;
}

interface IV4SurveyResult {
  outcome: ISurveyOutcome | undefined;
  noOutcome: ISurveyOutcome | undefined;
}
@Injectable({
  providedIn: 'root'
})
export class V4SurveyService implements SurveyService {
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

  private mapQuestionTypeToFormlyType(type: SurveyQuestionType): string {
    switch (type) {
      case SurveyQuestionType.choice:
        return 'survey-select';
      case SurveyQuestionType.pictureChoice:
        return 'pic-survey-select';
      default:
        return 'survey-select';
    }
  }

  private makeFormlyConfig(questionSurvey: IV4SurveyQuestion, lang: string = 'en'): FormlyFieldConfig {
    const { payload, question, required, description, id } = questionSurvey;
    const formlyCustomFieldType = this.mapQuestionTypeToFormlyType(payload.type);
    return {
      templateOptions: {
        label: question[lang].text,
        description: description[lang].text,
        bannerImage: oc(question[lang]).image.value.image_url(''),
        required
      },
      fieldGroup: [{
        key: id,
        type: formlyCustomFieldType,
        templateOptions: {
          type: payload.multiple ? 'array' : 'string',
          multiple: payload.multiple,
          // comes a point i should conditionally have options field or not for example input,
          // need more info on how alternative question choices are going to look like,
          // https://github.com/PerxTech/perx-api/blob/develop/app/schemas/questions/long-text.json will work on it later, when dashboard
          // is configurable
          options: payload.choices.map((choice) =>
          ({
            label: (formlyCustomFieldType === 'pic-survey-select') ? (
              choice.answer[lang].image ? choice.answer[lang].image.value.image_url : '')
              : choice.answer[lang].text,
            value: choice.answer[lang].text
          })
          ),
          required
        }
      }]
    };
  }

  private buildOutcomes(displayProperties: IV4SurveyDisplayProperties | undefined, lang: string): IV4SurveyResult {
    let outcome, noOutcome;
    if (displayProperties) {
      if (displayProperties.outcome) {
        outcome = {
          title: displayProperties.outcome.title[lang].text,
          subTitle: displayProperties.outcome.description[lang].text,
          button: displayProperties.outcome.button_text[lang].text,
          image: displayProperties.outcome.outcome_image ? displayProperties.outcome.outcome_image.value.image_url : ''
        };
      }

      if (displayProperties.nooutcome) {
        noOutcome = {
          title: displayProperties.nooutcome.title[lang].text,
          subTitle: displayProperties.nooutcome.description[lang].text,
          button: displayProperties.nooutcome.button_text[lang].text
        };
      }
    }
    return { outcome, noOutcome };
  }

  @Cacheable({})
  public getSurveyFromCampaign(campaignId: number, lang: string = 'en'): Observable<ISurvey> {
    return this.baseUrl$.pipe(
      switchMap(baseUrl => this.http.get<IV4SurveyResponse>(`${baseUrl}/v4/campaigns/${campaignId}/games`)),
      map((res) => res.data[0]),
      map((surveyCampaign: IV4Survey): ISurvey => {
        if (!surveyCampaign) {
          throw new Error(`No available game for this campaign #${campaignId}`);
        }
        const dp = surveyCampaign.display_properties;
        const fields: FormlyFieldConfig[] = dp ? dp.questions.map((question) => this.makeFormlyConfig(question, lang)) : [];
        const outcomes = this.buildOutcomes(dp, lang);
        return {
          id: surveyCampaign.id,
          title: dp?.header?.value?.title?.length ? dp.header.value.title[lang] as { text: string } : undefined,
          subTitle: dp?.header?.value?.description?.length ? dp.header.value.description[lang] as { text: string } : undefined,
          results: { ...outcomes },
          fields,
          backgroundImgUrl: patchUrl(oc(dp).background_image.value.image_url('')),
          cardBackgroundImgUrl: patchUrl(oc(dp).card_image.value.image_url('')),
          ctaButtonBGColor: dp?.CTA_button_bg_color ? dp?.CTA_button_bg_color : undefined,
          ctaButtonTextColor: dp?.CTA_button_text_color ? dp?.CTA_button_text_color : undefined,
        };
      })
    );
  }

  public postSurveyAnswer(answerPost: IAnswer, moveId: number): Observable<{
    hasOutcomes: boolean,
    answers: IAnswer[]
  }> {
    const payload: V4SurveyAnswerRequest = {
      answer: {
        question_id: answerPost && answerPost.questionId,
        content: answerPost.content,
      }
    };
    return this.baseUrl$.pipe(
      switchMap(baseUrl => this.http.put<V4NextMoveResponse>(`${baseUrl}/v4/game_transactions/${moveId}/answer`, payload)),
      map(res => ({
        hasOutcomes: res.data.outcomes.length > 0,
        answers: res.data.answers.map(answer => ({
          questionId: answer.question_id,
          content: answer.content
        }))
      })
      )
    );
  }

  public getMoveId(gameId?: number): Observable<number> {
    if (gameId === undefined || gameId === null) {
      return of();
    }
    return this.baseUrl$.pipe(
      switchMap(baseUrl => this.http.post<{ data: { id: number } }>(`${baseUrl}/v4/games/${gameId}/next_move`, null)),
      map((api) => api.data.id)
    );
  }

  public postFinalSurveyAnswer(moveId: number): Observable<ISurveyResultOutcome> {
    return this.baseUrl$.pipe(
      switchMap(baseUrl => this.http.put(`${baseUrl}/v4/game_transactions/${moveId}/finish`, {})),
      map((answerResponse: any) => {
        const v4Vouchers = answerResponse.data.outcomes.filter(outcome => outcome.id &&
          outcome.outcome_type === OutcomeType.reward) as IV4Voucher[];
        const v4Points = answerResponse.data.outcomes.filter(outcome =>
          outcome.id && outcome.outcome_type === OutcomeType.points) as IV4PointsOutcome[];
        const v4PrizeSets = answerResponse.data.outcomes.filter(outcome => outcome.id &&
          outcome.outcome_type === OutcomeType.prizeSet) as IV4PrizeSetOutcome[];
        const v4Badges = answerResponse.data.outcomes.filter(outcome => outcome.id &&
          outcome.outcome_type === OutcomeType.badge) as IV4BadgeOutcome[];
        const vouchers = v4Vouchers.map(voucher => V4VouchersService.v4VoucherToVoucher(voucher));
        const points = v4Points.map(point => V4CampaignService.v4PointsToPoints(point));
        const prizeSets = v4PrizeSets.map(prizeSet => V4PrizeSetOutcomeService.v4PrizeSetOutcomeToPrizeSetOutcome(prizeSet));
        const badges = v4Badges.map(badge => V4CampaignService.v4BadgeToBadge(badge));
        if (answerResponse.data.outcomes?.length &&
          (answerResponse.data.outcomes[0].outcome_type === OutcomeType.reward
            || answerResponse.data.outcomes[0].outcome_type === OutcomeType.points
            || answerResponse.data.outcomes[0].outcome_type === OutcomeType.prizeSet
            || answerResponse.data.outcomes[0].outcome_type === OutcomeType.badge)) {
          return {
            rewardAcquired: true,
            ...(vouchers?.length && { vouchers }),
            ...(points && { points }),
            ...(prizeSets && { prizeSets }),
            ...(badges && { badges })
          };
        }
        return { rewardAcquired: false };
      }),
      catchError(_ => of({ rewardAcquired: false }))
    );
  }
}
