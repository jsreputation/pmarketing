import { Injectable } from '@angular/core';
import { IConfig } from '../config/models/config.model';
import { ConfigService } from '../config/config.service';
import { IAnswer,  ISurvey, SurveyQuestionType } from './models/survey.model';
import { SurveyService } from './survey.service';
import { Observable, of, ReplaySubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';
import { map, switchMap } from 'rxjs/operators';
import { IV4Campaign, IV4CampaignResponse } from '../campaign/v4-campaign.service';
import { IV4SurveyDisplayProperties, IV4SurveyOutcome, IV4SurveyQuestion } from './models/v4-survey.model';
import { oc } from 'ts-optchain';
import { patchUrl } from '../utils/patch-url.function';
import { FormlyFieldConfig } from '@ngx-formly/core';

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
        break;
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
    }]};
  }

  @Cacheable({})
  public getSurveyFromCampaign(campaignId: number, lang: string = 'en'): Observable<ISurvey> {
    return this.baseUrl$.pipe(
      switchMap(baseUrl => this.http.get<IV4CampaignResponse>(`${baseUrl}/v4/campaigns/${campaignId}/games`)),
      map((res) => res.data[0]),
      map((surveyCampaign: IV4Campaign): ISurvey => {
        const dp: IV4SurveyDisplayProperties = surveyCampaign.display_properties as IV4SurveyDisplayProperties;
        const fields: FormlyFieldConfig[] = dp.questions.map((question) => this.makeFormlyConfig(question, lang));
        let outcome: IV4SurveyOutcome | undefined;
        if (oc(dp).headline_text() ||
          oc(dp).body_text() ||
          oc(dp).button_text()) {
          outcome = {
            title: oc(dp).headline_text(''),
            subTitle: oc(dp).body_text(''),
            button: oc(dp).button_text('')
          };
        }

        return {
          id: surveyCampaign.id,
          /* eslint-disable */
          title: (oc(dp).header.value.title ?
            oc(dp).header.value.title[lang]() :
            oc(dp).header.value.title['en']()) as {text: string},
          subTitle: (oc(dp).header.value.description() ?
            oc(dp).header.value.description[lang]() :
            oc(dp).header.value.description['en']()) as {text: string},
          /* eslint-enable */
          results: {
            outcome
          },
          fields,
          backgroundImgUrl: patchUrl(oc(dp).background_image.value.image_url('')),
          cardBackgroundImgUrl: patchUrl(oc(dp).card_image.value.image_url('')),
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
      switchMap(baseUrl => this.http.patch<V4NextMoveResponse>(`${baseUrl}/v4/game_transactions/${moveId}/answer`, payload)),
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
      switchMap(baseUrl => this.http.post<{data: {id: number}}>(`${baseUrl}/v4/games/${gameId}/next_move`, null)),
      map((api) => api.data.id)
    );
  }

}
