import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { IWSpinGameEngagementAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class SpinHttpService {

  constructor(private http: HttpClient) {
  }

  public getSpinData(): Observable<ISpinDefaultValue> {
    return this.http.get<ISpinDefaultValue>('assets/actives/spin/spin-data.json');
  }

  public createSpin(data: IJsonApiPostItem<IWSpinGameEngagementAttributes>): Observable<IJsonApiPayload<IWSpinGameEngagementAttributes>> {
    return this.http.post<IJsonApiPayload<IWSpinGameEngagementAttributes>>(ApiConfig.engagementsPath + '/', data);
  }

  public updateSpin(id: string, data: IJsonApiPayload<IWSpinGameEngagementAttributes>):
    Observable<IJsonApiPayload<IWSpinGameEngagementAttributes>> {
    return this.http.patch<IJsonApiPayload<IWSpinGameEngagementAttributes>>(ApiConfig.engagementsPath + '/game/' + id, data);
  }

  public getSpin(id: string): Observable<IJsonApiPayload<IWSpinGameEngagementAttributes>> {
    return this.http.get<IJsonApiPayload<IWSpinGameEngagementAttributes>>(ApiConfig.engagementsPath + '/game/' + id);
  }

}
