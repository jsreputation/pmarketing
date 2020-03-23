import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {
  IJsonApiItemPayload,
  IWCampaignDisplayProperties,
  IWPostAnswerAttributes,
  IWProperties,
  IWSurveyEngagementAttributes,
  //  WSurveyQuestionType
} from '@perxtech/whistler';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { ICampaign, ICampaignService } from '../../public-api';
import { Config } from '../config/config';
import {
  IQAnswer,
  // IQQuestion,
  IQuiz,
  ISurveyOutcome,
  MaterialColor,
  //  QuizQuestionType
} from './models/quiz.model';
import { QuizService } from './quiz.service';

@Injectable({
  providedIn: 'root'
})
export class V4QuizService implements QuizService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private campaignService: ICampaignService,
    config: Config,
  ) {
    this.baseUrl = config.apiHost || '';
  }

  public getQuizFromCampaign(id: number): Observable<IQuiz> {
    let disProp: IWCampaignDisplayProperties | undefined;
    return this.campaignService.getCampaign(id)
      .pipe(
        switchMap(
          (campaign: ICampaign) => {
            disProp = campaign.displayProperties;
            return this.http.get<IJsonApiItemPayload<IWSurveyEngagementAttributes>>(
              `${this.baseUrl}/survey/engagements/${campaign.engagementId}?campaign_id=${id}`
            );
          }
        ),
        // tap(s => console.error('got survey', s)),
        map((res: IJsonApiItemPayload<IWSurveyEngagementAttributes>) => {
          const surveyData = V4QuizService.WQuizToQuiz(res);
          const results: { [key: string]: ISurveyOutcome } = {};
          if (disProp && disProp.successPopUp) {
            results.outcome = V4QuizService.outcomeToGameOutcome(disProp.successPopUp);
          }
          if (disProp && disProp.noRewardsPopUp) {
            results.noOutcome = V4QuizService.outcomeToGameOutcome(disProp.noRewardsPopUp);
          }
          return {
            ...surveyData,
            results,
            displayProperties: { ...surveyData.displayProperties, ...disProp }
          };
        })
      );
  }

  public patchQuizAnswer(answers: IQAnswer[], campaignId: number, surveyId: number): Observable<{ hasOutcomes: boolean }> {
    const body = {
      data: {
        type: 'answers',
        attributes: {
          engagement_id: surveyId,
          campaign_entity_id: campaignId,
          content: answers
        }
      }
    };

    return this.http.patch<IJsonApiItemPayload<IWPostAnswerAttributes>>(`${this.baseUrl}/survey/answers`, body, {
      headers: { 'Content-Type': 'application/vnd.api+json' }
    }).pipe(
      map((res) => {
        const hasOutcomes = res.data.attributes.results.attributes.results.length > 0;
        return {
          hasOutcomes
        };
      })
    );
  }

  public postQuizAnswer(answers: IQAnswer[], campaignId: number, surveyId: number): Observable<{ hasOutcomes: boolean }> {
    const body = {
      data: {
        type: 'answers',
        attributes: {
          engagement_id: surveyId,
          campaign_entity_id: campaignId,
          content: answers
        }
      }
    };

    return this.http.post<IJsonApiItemPayload<IWPostAnswerAttributes>>(`${this.baseUrl}/survey/answers`, body, {
      headers: { 'Content-Type': 'application/vnd.api+json' }
    }).pipe(
      map((res) => {
        const hasOutcomes = res.data.attributes.results.attributes.results.length > 0;
        return {
          hasOutcomes
        };
      })
    );
  }

  private static outcomeToGameOutcome(outcome: IWProperties): ISurveyOutcome {
    return {
      title: outcome.headLine ? outcome.headLine : '',
      subTitle: outcome.subHeadLine ? outcome.subHeadLine : '',
      button: outcome.buttonTxt ? outcome.buttonTxt : '',
      image: outcome.imageURL
    };
  }

  // private static WQTypeToQType(t: WSurveyQuestionType): QuizQuestionType {
  //   // todo have a smarter mapping
  //   return t as unknown as QuizQuestionType;
  // }

  private static WQuizToQuiz(survey: IJsonApiItemPayload<Partial<IWSurveyEngagementAttributes>>): IQuiz {
    const dp = survey.data.attributes.display_properties;
    if (dp) {
      // const questions: IQQuestion[] = dp.questions.map(q => {
      //   const payload = { ...q.payload, type: V4QuizService.WQTypeToQType(q.payload.type) };
      //   return { ...q, payload };
      // });
      return {
        id: survey.data.id,
        title: dp.title || '',
        subTitle: dp.sub_title,
        progressBarColor: MaterialColor[dp.progress_bar_color],
        cardBackgroundImgUrl: dp.card_background_img_url,
        backgroundImgUrl: dp.background_img_url,
        questions: [],
        results: {}
      };
    }
    throw new Error('Display properties does not exist for mapping to occur');
  }
}
