import { Injectable } from '@angular/core';
import { SurveyHttpService } from '@cl-core/http-services/survey-http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SurveyHttpAdapter } from '@cl-core/http-adapters/survey-http-adapter';
import { ISurveyForm } from '@cl-core/models/survey/survey-common.interface';
import { IWSurveyEngagementAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private surveyHttp: SurveyHttpService) {
  }

  public getSurveyQuestionType(): Observable<IEngagementQuestionType[]> {
    return this.surveyHttp.getQuestionType()
      .pipe(
        map(res => (res as IEngagementQuestionType[]))
      );
  }

  public getCountriesList(): Observable<any> {
    return this.surveyHttp.getCountriesList()
      .pipe(
        map(res => (res as IApacCountries[]))
      );
  }

  public getDefaultCountryCode(): Observable<any> {
    return this.surveyHttp.getDefaultCountryCode();
  }

  public getSurveyData(): Observable<{
    background: IGraphic[],
    cardBackground: IGraphic[]
  }> {
    return this.surveyHttp.getSurveyData();
  }

  public getSurvey(id: string): Observable<ISurveyForm> {
    return this.surveyHttp.getSurvey(id)
      .pipe(
        map(res => SurveyHttpAdapter.transformToSurveyForm(res.data))
      );
  }

  public createSurvey(data: ISurveyForm): Observable<IJsonApiPayload<IWSurveyEngagementAttributes>> {
    const sendData = SurveyHttpAdapter.transformSurvey(data);
    return this.surveyHttp.createSurvey({data: sendData});
  }

  public updateSurvey(id: string, data: ISurveyForm): Observable<IJsonApiPayload<IWSurveyEngagementAttributes>> {
    const sendData = SurveyHttpAdapter.transformSurvey(data);
    sendData.id = id;
    return this.surveyHttp.updateSurvey(id, {data: sendData});
  }

  public getSurveyReport(id: string): Observable<IBaseQuestionReport> {
    return this.surveyHttp.getSurveyReport(id);
  }
}
