import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWEngagementAttributes, IJsonApiListPayload, IJsonApiItemPayload } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class EngagementsHttpsService {
  constructor(public http: HttpClient) {
  }

  public getEngagements(): Observable<IJsonApiListPayload<IWEngagementAttributes>> {
    return this.http.get<IJsonApiListPayload<IWEngagementAttributes>>(ApiConfig.engagementsPath + '/');
  }

  public getEngagement(id: string, type: string): Observable<IJsonApiItemPayload<IWEngagementAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWEngagementAttributes>>(`${ApiConfig.basePath}/${type}/engagements/${id}`);
  }
}
