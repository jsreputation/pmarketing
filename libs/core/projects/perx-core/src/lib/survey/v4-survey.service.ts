import { Injectable } from '@angular/core';
import {
  ConfigService, IAnswer,
  IConfig,
  IQQuestion,
  SurveyService
} from '@perxtech/core';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Cacheable } from 'ngx-cacheable';
import { map, switchMap } from 'rxjs/operators';
import { IV4Campaign, IV4CampaignResponse } from '../campaign/v4-campaign.service';
import { IV4Survey, IV4SurveyDisplayProperties, IV4SurveyOutcome } from './models/v4-survey.model';
import { oc } from 'ts-optchain';
import { patchUrl } from '../utils/patch-url.function';


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

  @Cacheable({})
  public getSurveyFromCampaign(campaignId: number, lang: string = 'en'): Observable<any> {
    console.log('AM I BEING CALLED')
    return this.baseUrl$.pipe(
      switchMap(baseUrl => this.http.get<IV4CampaignResponse>(`${baseUrl}/v4/campaigns/${campaignId}`)),
      map((res) => res.data),
      map((surveyCampaign: IV4Campaign): IV4Survey => {
        const dp: IV4SurveyDisplayProperties = surveyCampaign.display_properties as IV4SurveyDisplayProperties;
        const questions: IQQuestion[] = dp.questions.map(question => {
          const payload = { ...question.payload };
          payload.choices = payload.choices.map(choice => ({
            title: choice.answer[lang] || choice.answer.en,
            id: choice.answer_id
          }));

          return {
            id: question.id,
            question: question.question[lang] || question.question.en,
            description: question.description ? question.description[lang] : oc(question).description.en(),
            required: question.required,
            payload
          };
        });
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
          title: (oc(dp).header.value.title ?
            oc(dp).header.value.title[lang]() :
            oc(dp).header.value.title['en']()) as {text: string},
          subTitle: (oc(dp).header.value.description() ?
            oc(dp).header.value.description[lang]() :
            oc(dp).header.value.description['en']()) as {text: string},
          results: {
            outcome
          },
          questions,
          backgroundImgUrl: patchUrl(oc(dp).background_image.value.image_url('')),
          cardBackgroundImgUrl: patchUrl(oc(dp).card_image.value.image_url('')),
        };
      })
    );
  }

  public postSurveyAnswer(answers: IAnswer[], campaignId: number, surveyId: number): Observable<any> {
    console.log(answers, campaignId, surveyId, 'not imeplemented yet')
  }

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
