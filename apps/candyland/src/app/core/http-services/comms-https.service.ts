import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWCommTemplateAttributes, IWCommEventAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class CommsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getCommsTemplates(params: HttpParams): Observable<IJsonApiListPayload<IWCommTemplateAttributes>> {
    return this.http.get<IJsonApiListPayload<IWCommTemplateAttributes>>(ApiConfig.commsTemplatesPath, { params });
  }

  public getCommsEvents(params: HttpParams): Observable<IJsonApiListPayload<IWCommEventAttributes>> {
    return this.http.get<IJsonApiListPayload<IWCommEventAttributes>>(ApiConfig.commsEventsPath, { params });
  }

  public updateCommsEvent(id: string, data: IJsonApiPayload<IWCommEventAttributes>): Observable<IJsonApiPayload<IWCommEventAttributes>> {
    return this.http.patch<IJsonApiPayload<any>>(ApiConfig.commsEventsPath + '/' + id, data);
  }

  public createCommsEvent(data: IJsonApiPayload<IWCommEventAttributes>): Observable<IJsonApiPayload<IWCommEventAttributes>> {
    return this.http.post<IJsonApiPayload<any>>(ApiConfig.commsEventsPath, data);
  }

  public deleteCommsEvent(id: string): Observable<any> {
    return this.http.delete(`${ApiConfig.commsEventsPath}/${id}`);
  }

  public updateCommsTemplate(
    id: string,
    data: IJsonApiPayload<IWCommTemplateAttributes>
  ): Observable<IJsonApiPayload<IWCommTemplateAttributes>> {
    return this.http.patch<IJsonApiPayload<any>>(ApiConfig.commsTemplatesPath + '/' + id, data);
  }

  public createCommsTemplate(data: IJsonApiPayload<IWCommTemplateAttributes>): Observable<IJsonApiPayload<IWCommTemplateAttributes>> {
    return this.http.post<IJsonApiPayload<any>>(ApiConfig.commsTemplatesPath, data);
  }

  public deleteCommsTemplate(id: string): Observable<any> {
    return this.http.delete(`${ApiConfig.commsTemplatesPath}/${id}`);
  }
}
