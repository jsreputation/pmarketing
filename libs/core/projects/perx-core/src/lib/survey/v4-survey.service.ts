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
   const { payload, question, required, description } = questionSurvey;
   const formlyCustomFieldType = this.mapQuestionTypeToFormlyType(payload.type);
   return {
    templateOptions: {
      label: question[lang].text,
      description: description[lang].text,
      required
    },
    fieldGroup: [{
      key: question[lang].text,
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
            label: (formlyCustomFieldType === 'pic-survey-select') ? choice.answer[lang].image.value.image_url : choice.answer[lang].text,
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
      switchMap(baseUrl => this.http.get<IV4CampaignResponse>(`${baseUrl}/v4/campaigns/${campaignId}`)),
      map((res) => res.data),
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

  public postSurveyAnswer(answers: IAnswer[], campaignId: number, surveyId: number): Observable<any> {
    console.log(answers, campaignId, surveyId, 'not imeplemented yet');
    return of('tested');
  }

  // formly json take in requires backend integration else we do manual adapter

  // public postQuizAnswer(answer: IQAnswer, moveId: number): Observable<IAnswerResult> {
  //   const payload: V4QuizAnswerRequest = {
  //     answer: {
  //       question_id: answer.questionId,
  //       answer_ids: answer.content,
  //       time_taken: answer.timeTaken || -1
  //     }
  //   };
  //   return this.baseUrl$.pipe(
  //     switchMap(baseUrl => this.http.put<V4QuizAnswerResponse>(`${baseUrl}/v4/game_transactions/${moveId}/answer_quiz`, payload)),
  //     map(res => {
  //       const result: V4AnswerResponse | undefined = res.data.answers.find(ans => answer.questionId === ans.question_id);
  //       const points: number = oc(result).score(oc(result).is_correct() ? 1 : 0) || 0;
  //       return {
  //         hasOutcomes: res.data.outcomes.length > 0,
  //         points
  //       };
  //     })
  //   );
  // }
  //
  // private static v2Mode2Mode(mode: V4QuizMode): QuizMode {
  //   if (mode === V4QuizMode.swipe) {
  //     return QuizMode.swipe;
  //   }
  //   if (mode === V4QuizMode.elimination) {
  //     return QuizMode.elimination;
  //   }
  //   return QuizMode.basic;
  // }
}
