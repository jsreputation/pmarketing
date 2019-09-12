import { ICampaign } from './../campaign/models/campaign.model';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ISurvey, IQuestion, MaterialColor } from './models/survey.model';
import { Config } from '../config/config';
import { HttpClient } from '@angular/common/http';
import { ICampaignService } from '../campaign/icampaign.service';
import { mergeMap, map } from 'rxjs/operators';

interface IWhistlerSurvey {
  id: string;
  attributes: IWhistlerSurveyAttributes;
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

  public WhistlerCampaignToCampaign(survey: IWhistlerSurvey): ISurvey {
    const dp = survey.attributes.display_properties;
    return {
      id: survey.id,
      title: survey.attributes.title,
      sub_title: dp.sub_title,
      progress_bar_color: MaterialColor[dp.progress_bar_color],
      card_background_img_url: dp.card_background_img_url,
      background_img_url: dp.background_img_url,
      questions: dp.questions
    };
  }

  public getSurveyFromCampaign(id: number): Observable<ISurvey> {
    return this.campaignService.getCampaign(id).pipe(
      mergeMap(
        (campaign: ICampaign) => {
          return this.http.get<IWhistlerSurvey>(
            this.baseUrl + '/survey/engagements' + campaign.engagementId
          );
        }
      ),
      map((res: IWhistlerSurvey) => this.WhistlerCampaignToCampaign(res))
    );
  }
}
