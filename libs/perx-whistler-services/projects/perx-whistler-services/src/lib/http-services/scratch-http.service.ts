import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { IWScratchGameEngagementAttributes, IJsonApiItemPayload, IJsonApiPatchItem, IJsonApiPostItem } from '@perx/whistler';
import { ApiConfigServices } from '../configs/api-config';

@Injectable()
export class ScratchHttpService {

  constructor(private http: HttpClient,
              private apiConfig: ApiConfigServices) { }

  public createScratch(
    data: IJsonApiPostItem<IWScratchGameEngagementAttributes>
  ): Observable<IJsonApiItemPayload<IWScratchGameEngagementAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWScratchGameEngagementAttributes>>(this.apiConfig.engagementsPath + '/', data);
  }

  public updateScratch(
    id: string,
    data: IJsonApiPatchItem<IWScratchGameEngagementAttributes>
  ): Observable<IJsonApiItemPayload<IWScratchGameEngagementAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWScratchGameEngagementAttributes>>(this.apiConfig.engagementsPath + '/game/' + id, data);
  }

  public getScratch(id: string): Observable<IJsonApiItemPayload<IWScratchGameEngagementAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWScratchGameEngagementAttributes>>(this.apiConfig.engagementsPath + '/game/' + id);
  }
}
