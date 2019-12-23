import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { IWScratchGameEngagementAttributes, IJsonApiItemPayload, IJsonApiPatchItem, IJsonApiPostItem } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class ScratchHttpService {

  constructor(private http: HttpClient) { }

  public getScratchData(): Observable<IGameDefaultData> {
    return this.http.get<IGameDefaultData>('assets/actives/scratch/scratch-data.json');
  }

  public createScratch(
    data: IJsonApiPostItem<IWScratchGameEngagementAttributes>
  ): Observable<IJsonApiItemPayload<IWScratchGameEngagementAttributes>> {
    return this.http.post<IJsonApiItemPayload<IWScratchGameEngagementAttributes>>(ApiConfig.engagementsPath + '/', data);
  }

  public updateScratch(
    id: string,
    data: IJsonApiPatchItem<IWScratchGameEngagementAttributes>
  ): Observable<IJsonApiItemPayload<IWScratchGameEngagementAttributes>> {
    return this.http.patch<IJsonApiItemPayload<IWScratchGameEngagementAttributes>>(ApiConfig.engagementsPath + '/game/' + id, data);
  }

  public getScratch(id: string): Observable<IJsonApiItemPayload<IWScratchGameEngagementAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWScratchGameEngagementAttributes>>(ApiConfig.engagementsPath + '/game/' + id);
  }
}
