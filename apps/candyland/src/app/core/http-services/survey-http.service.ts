import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWSurveyEngagementAttributes, IJsonApiItemPayload } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class SurveyHttpService {

  constructor(
    private http: HttpClient
  ) {
  }

  public getSurvey(id: string): Observable<IJsonApiItemPayload<IWSurveyEngagementAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWSurveyEngagementAttributes>>(ApiConfig.engagementsPath + '/survey/' + id);
  }

  public createSurvey(
    data: IJsonApiItemPayload<IWSurveyEngagementAttributes>
  ): Observable<IJsonApiItemPayload<IWSurveyEngagementAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWSurveyEngagementAttributes>>(ApiConfig.engagementsPath + '/', data);
  }

  public updateSurvey(id: string, data: IJsonApiItemPayload<IWSurveyEngagementAttributes>):
    Observable<IJsonApiItemPayload<IWSurveyEngagementAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWSurveyEngagementAttributes>>(ApiConfig.engagementsPath + '/survey/' + id, data);
  }
}
