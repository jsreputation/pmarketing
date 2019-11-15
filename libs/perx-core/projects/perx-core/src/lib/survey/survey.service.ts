import { ICampaign } from './../campaign/models/campaign.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISurvey, IQuestion, MaterialColor, IAnswer, SurveyQuestionType } from './models/survey.model';
import { Config } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { ICampaignService } from '../campaign/icampaign.service';
import { map, switchMap, tap } from 'rxjs/operators';

import {
  IWSurveyEngagementAttributes,
  IWPostAnswerAttributes,
  WSurveyQuestionType,
  IJsonApiItemPayload
} from '@perx/whistler';

import { IWCampaignDisplayProperties } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {
  private baseUrl: string;

  constructor(
    private http: HttpClient,
    private campaignService: ICampaignService,
    config: Config,
  ) {
    this.baseUrl = config.apiHost || '';
  }

  private static WQTypeToQType(t: WSurveyQuestionType): SurveyQuestionType {
    // todo have a smarter mapping
    return t as unknown as SurveyQuestionType;
  }

  public static WSurveyToSurvey(survey: IJsonApiItemPayload<Partial<IWSurveyEngagementAttributes>>): ISurvey {
    const dp = survey.data.attributes.display_properties;
    if (dp) {
      const questions: IQuestion[] = dp.questions.map(q => {
        const payload = { ...q.payload, type: SurveyService.WQTypeToQType(q.payload.type) };
        return { ...q, payload };
      });
      return {
        id: survey.data.id,
        title: survey.data.attributes.title || '',
        subTitle: dp.sub_title,
        progressBarColor: MaterialColor[dp.progress_bar_color],
        cardBackgroundImgUrl: dp.card_background_img_url,
        backgroundImgUrl: dp.background_img_url,
        questions
      };
    }
    throw new Error('Display properties does not exist for mapping to occur');
  }

  public getSurveyFromCampaign(id: number): Observable<ISurvey> {
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
        tap(s => console.error('got survey', s)),
        map((res: IJsonApiItemPayload<IWSurveyEngagementAttributes>) => {
          const surveyData = SurveyService.WSurveyToSurvey(res);
          return { ...surveyData, displayProperties: { ...surveyData.displayProperties, ...disProp } };
        })
      );
  }

  public postSurveyAnswer(answers: IAnswer[], survey: ISurvey, campaignId: number): Observable<{ hasOutcomes: boolean }> {
    const body = {
      data: {
        type: 'answers',
        attributes: {
          engagement_id: survey.id,
          campaign_entity_id: campaignId,
          content: answers
        }
      }
    };

    return this.http.post<IJsonApiItemPayload<IWPostAnswerAttributes>>(this.baseUrl + '/survey/answers', body, {
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
}
