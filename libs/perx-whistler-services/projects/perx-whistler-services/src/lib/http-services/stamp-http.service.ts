import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWStampEngagementAttributes, IJsonApiPostItem, IJsonApiItemPayload, IJsonApiPatchItem } from '@perx/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class StampHttpService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigServices
  ) { }

  public createStamp(data: IJsonApiPostItem<IWStampEngagementAttributes>): Observable<IJsonApiItemPayload<IWStampEngagementAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWStampEngagementAttributes>>(`${this.apiConfig.stampsPath}/`, data);
  }

  public updateStamp(id: string, data: IJsonApiPatchItem<IWStampEngagementAttributes>):
    Observable<IJsonApiItemPayload<IWStampEngagementAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWStampEngagementAttributes>>(`${this.apiConfig.engagementsPath}/stamps/${id}`, data);
  }

  public getStamp(id: string): Observable<IJsonApiItemPayload<IWStampEngagementAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWStampEngagementAttributes>>(`${this.apiConfig.engagementsPath}/stamps/${id}`);
  }
}
