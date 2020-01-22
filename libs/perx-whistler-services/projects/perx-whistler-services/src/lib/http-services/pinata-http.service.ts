import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWPinataGameEngagementAttributes, IJsonApiItemPayload, IJsonApiPostItem, IJsonApiPatchItem } from '@perx/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class PinataHttpService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigServices
  ) { }

  public createPinata(
    data: IJsonApiPostItem<IWPinataGameEngagementAttributes>
  ): Observable<IJsonApiItemPayload<IWPinataGameEngagementAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWPinataGameEngagementAttributes>>(`${this.apiConfig.engagementsPath}/`, data);
  }

  public updatePinata(
    id: string,
    data: IJsonApiPatchItem<IWPinataGameEngagementAttributes>
  ): Observable<IJsonApiItemPayload<IWPinataGameEngagementAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWPinataGameEngagementAttributes>>(`${this.apiConfig.engagementsPath}/game/${id}`, data);
  }

  public getPinata(id: string): Observable<IJsonApiItemPayload<IWPinataGameEngagementAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWPinataGameEngagementAttributes>>(`${this.apiConfig.engagementsPath}/game/${id}`);
  }
}
