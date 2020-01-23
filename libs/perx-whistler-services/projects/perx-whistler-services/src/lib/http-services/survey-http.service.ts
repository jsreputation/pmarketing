import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWSurveyEngagementAttributes, IJsonApiItemPayload } from '@perx/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class SurveyHttpService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigServices
  ) {
  }

  public getSurvey(id: string): Observable<IJsonApiItemPayload<IWSurveyEngagementAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWSurveyEngagementAttributes>>(`${this.apiConfig.engagementsPath}/survey/${id}`);
  }

  public createSurvey(
    data: IJsonApiItemPayload<IWSurveyEngagementAttributes>
  ): Observable<IJsonApiItemPayload<IWSurveyEngagementAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWSurveyEngagementAttributes>>(`${this.apiConfig.engagementsPath}/`, data);
  }

  public updateSurvey(id: string, data: IJsonApiItemPayload<IWSurveyEngagementAttributes>):
    Observable<IJsonApiItemPayload<IWSurveyEngagementAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWSurveyEngagementAttributes>>(`${this.apiConfig.engagementsPath}/survey/${id}`, data);
  }
}
