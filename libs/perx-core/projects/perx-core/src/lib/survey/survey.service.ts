import { ICampaign } from './../campaign/models/campaign.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISurvey, MaterialColor, IAnswer, IQuestion, SurveyQuestionType } from './models/survey.model';
import { Config } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { ICampaignService } from '../campaign/icampaign.service';
import { map, switchMap, tap } from 'rxjs/operators';
import { IJsonApiItemPayload } from '../jsonapi.payload';

import {
  IWSurveyAttributes,
  IWPostAnswerAttributes
} from '@perx/whistler';

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
    this.baseUrl = config.apiHost;
  }

  private static WSurveyToSurvey(survey: IJsonApiItemPayload<IWSurveyAttributes>): ISurvey {
    const dp = survey.data.attributes.display_properties;
    const questions: IQuestion[] = dp.questions.map(q => {
      const payload = { ...q.payload, type: q.payload.type as unknown as SurveyQuestionType };
      return { ...q, payload };
    });
    return {
      id: survey.data.id,
      title: survey.data.attributes.title,
      sub_title: dp.sub_title,
      progress_bar_color: MaterialColor[dp.progress_bar_color],
      card_background_img_url: dp.card_background_img_url,
      background_img_url: dp.background_img_url,
      questions
    };
  }

  public getSurveyFromCampaign(id: number): Observable<ISurvey> {
    return this.campaignService.getCampaign(id)
      .pipe(
        switchMap(
          (campaign: ICampaign) => this.http.get<IJsonApiItemPayload<IWSurveyAttributes>>(
            `${this.baseUrl}/survey/engagements/${campaign.engagementId}?campaign_id=${id}`
          )
        ),
        tap(s => console.error('got survey', s)),
        map((res: IJsonApiItemPayload<IWSurveyAttributes>) => SurveyService.WSurveyToSurvey(res))
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
