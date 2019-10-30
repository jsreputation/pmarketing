import { ICampaign } from './../campaign/models/campaign.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISurvey, IQuestion, MaterialColor, IAnswer } from './models/survey.model';
import { Config } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { ICampaignService } from '../campaign/icampaign.service';
import { map, switchMap } from 'rxjs/operators';
import { IJsonApiItemPayload } from '../jsonapi.payload';

interface IWhistlerSurveyContent {
  id: string;
  attributes: IWhistlerSurveyAttributes;
}

interface IWhistlerSurvey {
  data: IWhistlerSurveyContent;
}
interface IWhistlerSurveyAttributes {
  id: string;
  title: string;
  description: string;
  image_url: string;
  properties: IWhistlerProperties;
  display_properties: IWhistlerDisplayProperties;
}

interface IWhistlerProperties {
  [key: string]: any;
}

interface IWhistlerDisplayProperties {
  title: string;
  sub_title: string;
  background_img_url: string;
  progress_bar_color: string;
  card_background_img_url: string;
  questions: IQuestion[];
  campaign_properties?: any;
}

interface IWhistlerPostAnswerAttributes {
  urn: string;
  created_at: string;
  updated_at: string;
  engagement_id: number;
  campaign_entity_id: number;
  results: IWhistlerOutcomes;
}

interface IWhistlerOutcomes {
  id: string;
  attributes: any;
  relationships: any;
  type: string;
}

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
    this.baseUrl = config.apiHost as string;
  }

  public static WhistlerSurveyService(survey: IWhistlerSurvey): ISurvey {
    const dp = survey.data.attributes.display_properties;
    return {
      id: survey.data.id,
      title: survey.data.attributes.title,
      sub_title: dp.sub_title,
      progress_bar_color: MaterialColor[dp.progress_bar_color],
      card_background_img_url: dp.card_background_img_url,
      background_img_url: dp.background_img_url,
      questions: dp.questions,
      campaign_properties: dp.campaign_properties
    };
  }

  public getSurveyFromCampaign(id: number): Observable<ISurvey> {
    let dispProp: any;
    return this.campaignService.getCampaign(id)
      .pipe(
        switchMap(
          (campaign: ICampaign) => {
            dispProp = campaign.displayProperties;
            return this.http.get<IWhistlerSurvey>(
              this.baseUrl + '/survey/engagements/' + campaign.rawPayload.engagement_id + '?campaign_id=' + id
            );
          }
        ),
        map((res: IWhistlerSurvey) => {
          res.data.attributes.display_properties.campaign_properties = dispProp;
          return SurveyService.WhistlerSurveyService(res);
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

    return this.http.post<IJsonApiItemPayload<IWhistlerPostAnswerAttributes>>(this.baseUrl + '/survey/answers', body, {
      headers: { 'Content-Type': 'application/vnd.api+json' }
    }).pipe(
      // tslint:disable-next-line: no-unused-expression
      map((res) => {
        const hasOutcomes = res.data.attributes.results.attributes.results.length > 0;
        return {
          hasOutcomes
        };
      })
    );
  }
}
