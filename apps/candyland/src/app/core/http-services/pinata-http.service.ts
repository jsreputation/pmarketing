import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWPinataGameEngagementAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class PinataHttpService {

  constructor(private http: HttpClient) {
  }

  public getPinataData(): Observable<{
    pinata: IGraphic[],
    background: IGraphic[]
  }> {
    return this.http.get<{
      pinata: IGraphic[],
      background: IGraphic[]
    }>('assets/actives/pinata/pinata-data.json');
  }

  public createPinata(data: any): Observable<IJsonApiPayload<IWPinataGameEngagementAttributes>> {
    return this.http.post<IJsonApiPayload<IWPinataGameEngagementAttributes>>(ApiConfig.engagementsPath + '/', data);
  }

  public updatePinata(id: string, data: IJsonApiPayload<IWPinataGameEngagementAttributes>):
    Observable<IJsonApiPayload<IWPinataGameEngagementAttributes>> {
    return this.http.patch<IJsonApiPayload<IWPinataGameEngagementAttributes>>(ApiConfig.engagementsPath + '/game/' + id, data);
  }

  public getPinata(id: string): Observable<IJsonApiPayload<IWPinataGameEngagementAttributes>> {
    return this.http.get<IJsonApiPayload<IWPinataGameEngagementAttributes>>(ApiConfig.engagementsPath + '/game/' + id);
  }
}
