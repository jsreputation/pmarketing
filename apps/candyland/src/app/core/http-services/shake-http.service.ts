import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWTreeGameEngagementAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class ShakeHttpService {

  constructor(private http: HttpClient) {
  }

  public getData(): Observable<IGameDefaultData> {
    return this.http.get<IGameDefaultData>('assets/actives/shake-tree/data.json');
  }

  public createShakeTree(data: IJsonApiPayload<IWTreeGameEngagementAttributes>):
    Observable<IJsonApiPayload<IWTreeGameEngagementAttributes>> {
    return this.http.post<IJsonApiPayload<IWTreeGameEngagementAttributes>>(ApiConfig.engagementsPath + '/', data);
  }

  public updateShakeTree(id: string, data: IJsonApiPayload<IWTreeGameEngagementAttributes>):
    Observable<IJsonApiPayload<IWTreeGameEngagementAttributes>> {
    return this.http.patch<IJsonApiPayload<IWTreeGameEngagementAttributes>>(ApiConfig.engagementsPath + '/game/' + id, data);
  }

  public getShakeTree(id: string): Observable<IJsonApiPayload<IWTreeGameEngagementAttributes>> {
    return this.http.get<IJsonApiPayload<IWTreeGameEngagementAttributes>>(ApiConfig.engagementsPath + '/game/' + id);
  }
}
