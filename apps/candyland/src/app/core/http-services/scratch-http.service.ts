import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';
import { IWScratchGameEngagementAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class ScratchHttpService {

  constructor(private http: HttpClient) { }

  public getScratchData(): Observable<IGameDefaultData> {
    return this.http.get<IGameDefaultData>('assets/actives/scratch/scratch-data.json');
  }

  public createScratch(data: IJsonApiPayload<any>): Observable<IJsonApiPayload<IWScratchGameEngagementAttributes>> {
    return this.http.post<IJsonApiPayload<IWScratchGameEngagementAttributes>>(ApiConfig.engagementsPath + '/', data);
  }

  public updateScratch(id: string, data: IResponseApi<any>): Observable<IJsonApiPayload<IWScratchGameEngagementAttributes>> {
    return this.http.patch<IJsonApiPayload<IWScratchGameEngagementAttributes>>(ApiConfig.engagementsPath + '/game/' + id, data);
  }

  public getScratch(id: string): Observable<IJsonApiPayload<IWScratchGameEngagementAttributes>> {
    return this.http.get<IJsonApiPayload<IWScratchGameEngagementAttributes>>(ApiConfig.engagementsPath + '/game/' + id);
  }
}
