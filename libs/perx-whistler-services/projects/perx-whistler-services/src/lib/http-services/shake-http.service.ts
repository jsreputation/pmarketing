import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWTreeGameEngagementAttributes, IJsonApiItemPayload, IJsonApiPatchItem, IJsonApiPostItem } from '@perx/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class ShakeHttpService {
  constructor(
    private http: HttpClient,
    private apiConfig: ApiConfigServices
  ) { }

  public createShakeTree(data: IJsonApiPostItem<IWTreeGameEngagementAttributes>):
    Observable<IJsonApiItemPayload<IWTreeGameEngagementAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWTreeGameEngagementAttributes>>(`${this.apiConfig.engagementsPath}/`, data);
  }

  public updateShakeTree(id: string, data: IJsonApiPatchItem<IWTreeGameEngagementAttributes>):
    Observable<IJsonApiItemPayload<IWTreeGameEngagementAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWTreeGameEngagementAttributes>>(`${this.apiConfig.engagementsPath}/game/${id}`, data);
  }

  public getShakeTree(id: string): Observable<IJsonApiItemPayload<IWTreeGameEngagementAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWTreeGameEngagementAttributes>>(`${this.apiConfig.engagementsPath}/game/${id}`);
  }
}
