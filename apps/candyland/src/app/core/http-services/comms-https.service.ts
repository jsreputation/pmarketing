import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import {
  IWCommTemplateAttributes,
  IWCommEventAttributes,
  IJsonApiListPayload,
  IJsonApiItemPayload,
  IJsonApiPatchItem,
  IJsonApiPostItem
} from '@perx/whistler';

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

  public updateCommsEvent(
    id: string,
    data: IJsonApiPatchItem<IWCommEventAttributes>
  ): Observable<IJsonApiItemPayload<IWCommEventAttributes>> {
    return this.http.patch<IJsonApiItemPayload<any>>(ApiConfig.commsEventsPath + '/' + id, data);
  }

  public createCommsEvent(data: IJsonApiPostItem<IWCommEventAttributes>): Observable<IJsonApiItemPayload<IWCommEventAttributes>> {
    return this.http.post<IJsonApiItemPayload<any>>(ApiConfig.commsEventsPath, data);
  }

  public deleteCommsEvent(id: string): Observable<IJsonApiItemPayload<IWCommEventAttributes>> {
    return this.http.delete<IJsonApiItemPayload<IWCommEventAttributes>>(`${ApiConfig.commsEventsPath}/${id}`);
  }

  public updateCommsTemplate(
    id: string,
    data: IJsonApiPatchItem<IWCommTemplateAttributes>
  ): Observable<IJsonApiItemPayload<IWCommTemplateAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWCommTemplateAttributes>>(ApiConfig.commsTemplatesPath + '/' + id, data);
  }

  public createCommsTemplate(
    data: IJsonApiPostItem<IWCommTemplateAttributes>
  ): Observable<IJsonApiItemPayload<IWCommTemplateAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWCommTemplateAttributes>>(ApiConfig.commsTemplatesPath, data);
  }

  public deleteCommsTemplate(id: string): Observable<IJsonApiItemPayload<IWCommTemplateAttributes>> {
    return this.http.delete<IJsonApiItemPayload<IWCommTemplateAttributes>>(`${ApiConfig.commsTemplatesPath}/${id}`);
  }
}
