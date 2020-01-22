import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWEngagementAttributes, IJsonApiListPayload, IJsonApiItemPayload } from '@perx/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class EngagementsHttpsService {
  constructor(
    public http: HttpClient,
    private apiConfig: ApiConfigServices
  ) { }

  public getEngagements(): Observable<IJsonApiListPayload<IWEngagementAttributes>> {
    return this.http.get<IJsonApiListPayload<IWEngagementAttributes>>(`${this.apiConfig.engagementsPath}/`);
  }

  public getEngagement(id: string, type: string): Observable<IJsonApiItemPayload<IWEngagementAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWEngagementAttributes>>(`${this.apiConfig.baseApiPath}/${type}/engagements/${id}`);
  }
}
