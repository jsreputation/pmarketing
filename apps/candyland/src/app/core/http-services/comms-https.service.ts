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
}
