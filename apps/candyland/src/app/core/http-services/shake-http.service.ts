import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';
import { IWTreeGameEngagementAttributes, IJsonApiItemPayload, IJsonApiPatchItem, IJsonApiPostItem } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class ShakeHttpService {

  constructor(private http: HttpClient) {
  }

  public createShakeTree(data: IJsonApiPostItem<IWTreeGameEngagementAttributes>):
    Observable<IJsonApiItemPayload<IWTreeGameEngagementAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWTreeGameEngagementAttributes>>(ApiConfig.engagementsPath + '/', data);
  }

  public updateShakeTree(id: string, data: IJsonApiPatchItem<IWTreeGameEngagementAttributes>):
    Observable<IJsonApiItemPayload<IWTreeGameEngagementAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWTreeGameEngagementAttributes>>(ApiConfig.engagementsPath + '/game/' + id, data);
  }

  public getShakeTree(id: string): Observable<IJsonApiItemPayload<IWTreeGameEngagementAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWTreeGameEngagementAttributes>>(ApiConfig.engagementsPath + '/game/' + id);
  }
}
