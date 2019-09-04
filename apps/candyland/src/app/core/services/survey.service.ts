import { Injectable } from '@angular/core';
import { SurveyHttpService } from '@cl-core/http-services/survey-http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SurveyHttpAdapter } from '@cl-core/http-adapters/survey-http-adapter';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  constructor(private surveyHttp: SurveyHttpService) {
  }

  public getSurveyQuestionType(): Observable<IEngagementType[]> {
    return this.surveyHttp.getQuestionType()
      .pipe(
        map(res => (res as IEngagementType[]))
      );
  }

  public getCountriesList(): Observable<any> {
    return this.surveyHttp.getCountriesList()
      .pipe(
        map(res => (res as IApacCountries[]))
      );
  }

  public getSurveyData(): Observable<{
    background: IGraphic[],
    cardBackground: IGraphic[]
  }> {
    return this.surveyHttp.getSurveyData();
  }

  public getSurvey(id: string): Observable<any> {
    return this.surveyHttp.getSurvey(id);
  }

  public createSurvey(data: any): Observable<any> {
    const sendData = SurveyHttpAdapter.transformSurvey(data);
    return this.surveyHttp.createSurvey({data: sendData});
  }

  public updateSurvey(id: string, data: any): Observable<any> {
    return this.surveyHttp.updateSurvey(id, data);
  }
}
