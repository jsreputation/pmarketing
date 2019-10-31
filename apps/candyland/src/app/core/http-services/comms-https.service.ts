import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { ICommTemplateAttributes, ICommEventAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class CommsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getCommsTemplates(params: HttpParams): Observable<IJsonApiListPayload<ICommTemplateAttributes>> {
    return this.http.get<IJsonApiListPayload<ICommTemplateAttributes>>(ApiConfig.commsTemplatesPath, { params });
  }

  public getCommsEvents(params: HttpParams): Observable<IJsonApiListPayload<ICommEventAttributes>> {
    return this.http.get<IJsonApiListPayload<ICommEventAttributes>>(ApiConfig.commsEventsPath, { params });
  }

  public updateCommsEvent(id: string, data: IJsonApiPayload<ICommEventAttributes>): Observable<IJsonApiPayload<ICommEventAttributes>> {
    return this.http.patch<IJsonApiPayload<any>>(ApiConfig.commsEventsPath + '/' + id, data);
  }

  public createCommsEvent(data: IJsonApiPayload<ICommEventAttributes>): Observable<IJsonApiPayload<ICommEventAttributes>> {
    return this.http.post<IJsonApiPayload<any>>(ApiConfig.commsEventsPath, data);
  }

  public deleteCommsEvent(id: string): Observable<any> {
    return this.http.delete(`${ApiConfig.commsEventsPath}/${id}`);
  }

  public updateCommsTemplate(
    id: string,
    data: IJsonApiPayload<ICommTemplateAttributes>
  ): Observable<IJsonApiPayload<ICommTemplateAttributes>> {
    return this.http.patch<IJsonApiPayload<any>>(ApiConfig.commsTemplatesPath + '/' + id, data);
  }

  public createCommsTemplate(data: IJsonApiPayload<ICommTemplateAttributes>): Observable<IJsonApiPayload<ICommTemplateAttributes>> {
    return this.http.post<IJsonApiPayload<any>>(ApiConfig.commsTemplatesPath, data);
  }

  public deleteCommsTemplate(id: string): Observable<any> {
    return this.http.delete(`${ApiConfig.commsTemplatesPath}/${id}`);
  }
}
