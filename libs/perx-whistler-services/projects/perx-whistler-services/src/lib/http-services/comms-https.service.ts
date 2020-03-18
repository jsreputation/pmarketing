import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  IWCommTemplateAttributes,
  IWCommEventAttributes,
  IJsonApiListPayload,
  IJsonApiItemPayload,
  IJsonApiPatchItem,
  IJsonApiPostItem,
  IWCommMessageAttributes
} from '@perxtech/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class CommsHttpsService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigServices
  ) { }

  public getCommsTemplates(params: HttpParams): Observable<IJsonApiListPayload<IWCommTemplateAttributes>> {
    return this.http.get<IJsonApiListPayload<IWCommTemplateAttributes>>(this.apiConfig.commsTemplatesPath, { params });
  }

  public getCommsEvents(params: HttpParams): Observable<IJsonApiListPayload<IWCommEventAttributes>> {
    return this.http.get<IJsonApiListPayload<IWCommEventAttributes>>(this.apiConfig.commsEventsPath, { params });
  }

  public updateCommsEvent(
    id: string,
    data: IJsonApiPatchItem<IWCommEventAttributes>
  ): Observable<IJsonApiItemPayload<IWCommEventAttributes>> {
    return this.http.patch<IJsonApiItemPayload<any>>(`${this.apiConfig.commsEventsPath}/${id}`, data);
  }

  public createCommsEvent(data: IJsonApiPostItem<IWCommEventAttributes>): Observable<IJsonApiItemPayload<IWCommEventAttributes>> {
    return this.http.post<IJsonApiItemPayload<any>>(this.apiConfig.commsEventsPath, data);
  }

  public deleteCommsEvent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiConfig.commsEventsPath}/${id}`);
  }

  public updateCommsTemplate(
    id: string,
    data: IJsonApiPatchItem<IWCommTemplateAttributes>
  ): Observable<IJsonApiItemPayload<IWCommTemplateAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWCommTemplateAttributes>>(`${this.apiConfig.commsTemplatesPath}/${id}`, data);
  }

  public createCommsTemplate(
    data: IJsonApiPostItem<IWCommTemplateAttributes>
  ): Observable<IJsonApiItemPayload<IWCommTemplateAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWCommTemplateAttributes>>(this.apiConfig.commsTemplatesPath, data);
  }

  public deleteCommsTemplate(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiConfig.commsTemplatesPath}/${id}`);
  }

  public createMessage(data: IJsonApiPostItem<IWCommMessageAttributes>): Observable<IJsonApiItemPayload<IWCommMessageAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWCommMessageAttributes>>(this.apiConfig.commsMessagesPath, data);
  }

  public getMessages(params: HttpParams): Observable<IJsonApiListPayload<IWCommMessageAttributes>> {
    return this.http.get<IJsonApiListPayload<IWCommMessageAttributes>>(this.apiConfig.commsMessagesPath, { params });
  }

  public getMessage(id: string): Observable<IJsonApiItemPayload<IWCommMessageAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWCommMessageAttributes>>(`${this.apiConfig.commsMessagesPath}/${id}`);
  }
}
