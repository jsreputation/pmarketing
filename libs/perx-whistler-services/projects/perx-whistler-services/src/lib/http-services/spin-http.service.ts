import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { IWSpinGameEngagementAttributes, IJsonApiItemPayload, IJsonApiPostItem, IJsonApiPatchItem } from '@perxtech/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class SpinHttpService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigServices
  ) { }

  public createSpin(
    data: IJsonApiPostItem<IWSpinGameEngagementAttributes>
  ): Observable<IJsonApiItemPayload<IWSpinGameEngagementAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWSpinGameEngagementAttributes>>(`${this.apiConfig.engagementsPath}/`, data);
  }

  public updateSpin(id: string, data: IJsonApiPatchItem<IWSpinGameEngagementAttributes>):
  Observable<IJsonApiItemPayload<IWSpinGameEngagementAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWSpinGameEngagementAttributes>>(`${this.apiConfig.engagementsPath}/game/${id}`, data);
  }

  public getSpin(id: string): Observable<IJsonApiItemPayload<IWSpinGameEngagementAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWSpinGameEngagementAttributes>>(`${this.apiConfig.engagementsPath}/game/${id}`);
  }
}
