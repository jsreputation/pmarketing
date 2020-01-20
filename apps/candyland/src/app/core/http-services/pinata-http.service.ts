import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWPinataGameEngagementAttributes, IJsonApiItemPayload, IJsonApiPostItem, IJsonApiPatchItem } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class PinataHttpService {

  constructor(private http: HttpClient) {
  }

  public createPinata(
    data: IJsonApiPostItem<IWPinataGameEngagementAttributes>
  ): Observable<IJsonApiItemPayload<IWPinataGameEngagementAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWPinataGameEngagementAttributes>>(ApiConfig.engagementsPath + '/', data);
  }

  public updatePinata(
    id: string,
    data: IJsonApiPatchItem<IWPinataGameEngagementAttributes>
  ): Observable<IJsonApiItemPayload<IWPinataGameEngagementAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWPinataGameEngagementAttributes>>(ApiConfig.engagementsPath + '/game/' + id, data);
  }

  public getPinata(id: string): Observable<IJsonApiItemPayload<IWPinataGameEngagementAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWPinataGameEngagementAttributes>>(ApiConfig.engagementsPath + '/game/' + id);
  }
}
