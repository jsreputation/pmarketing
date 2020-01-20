import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { IWSpinGameEngagementAttributes, IJsonApiItemPayload, IJsonApiPostItem, IJsonApiPatchItem } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class SpinHttpService {

  constructor(private http: HttpClient) {
  }

  public createSpin(
    data: IJsonApiPostItem<IWSpinGameEngagementAttributes>
  ): Observable<IJsonApiItemPayload<IWSpinGameEngagementAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWSpinGameEngagementAttributes>>(ApiConfig.engagementsPath + '/', data);
  }

  public updateSpin(id: string, data: IJsonApiPatchItem<IWSpinGameEngagementAttributes>):
    Observable<IJsonApiItemPayload<IWSpinGameEngagementAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWSpinGameEngagementAttributes>>(ApiConfig.engagementsPath + '/game/' + id, data);
  }

  public getSpin(id: string): Observable<IJsonApiItemPayload<IWSpinGameEngagementAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWSpinGameEngagementAttributes>>(ApiConfig.engagementsPath + '/game/' + id);
  }
}
