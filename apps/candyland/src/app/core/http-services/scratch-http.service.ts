import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

import { ApiConfig } from '@cl-core/api-config';

@Injectable({
  providedIn: 'root'
})
export class ScratchHttpService {

  constructor(private http: HttpClient) { }

  public getScratchData(): Observable<IGameDefaultData> {
    return this.http.get<IGameDefaultData>('assets/actives/scratch/scratch-data.json');
  }

  public createScratch(data: IJsonApiPayload<any>): Observable<IResponseApi<IEngagementApi>> {
    return this.http.post<IResponseApi<IEngagementApi>>(ApiConfig.engagementsPath + '/', data);
  }

  public updateScratch(id: string, data: IResponseApi<any>): Observable<IResponseApi<IEngagementApi>> {
    return this.http.patch<IResponseApi<IEngagementApi>>(ApiConfig.engagementsPath + '/game/' + id, data);
  }

  public getScratch(id: string): Observable<IResponseApi<IEngagementApi>> {
    return this.http.get<IResponseApi<IEngagementApi>>(ApiConfig.engagementsPath + '/game/' + id);
  }
}
