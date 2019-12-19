import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWTreeGameEngagementAttributes, IJsonApiItemPayload } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class ShakeHttpService {

  constructor(private http: HttpClient) {
  }

  public getData(): Observable<IGameDefaultData> {
    return this.http.get<IGameDefaultData>('assets/actives/shake-tree/data.json');
  }

  public createShakeTree(data: IJsonApiItemPayload<IWTreeGameEngagementAttributes>):
    Observable<IJsonApiItemPayload<IWTreeGameEngagementAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWTreeGameEngagementAttributes>>(ApiConfig.engagementsPath + '/', data);
  }

  public updateShakeTree(id: string, data: IJsonApiItemPayload<IWTreeGameEngagementAttributes>):
    Observable<IJsonApiItemPayload<IWTreeGameEngagementAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWTreeGameEngagementAttributes>>(ApiConfig.engagementsPath + '/game/' + id, data);
  }

  public getShakeTree(id: string): Observable<IJsonApiItemPayload<IWTreeGameEngagementAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWTreeGameEngagementAttributes>>(ApiConfig.engagementsPath + '/game/' + id);
  }
}
