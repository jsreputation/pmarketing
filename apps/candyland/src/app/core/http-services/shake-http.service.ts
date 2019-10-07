import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ShakeHttpService {

  constructor(private http: HttpClient) {
  }

  public getData(): Observable<IGameDefaultData> {
    return this.http.get<IGameDefaultData>('assets/actives/shake-tree/data.json');
  }

  public createShakeTree(data: IJsonApiPayload<any>): Observable<IResponseApi<IEngagementApi>> {
    return this.http.post<IResponseApi<IEngagementApi>>(ApiConfig.engagementsPath + '/', data);
  }

  public updateShakeTree(id: string, data: IResponseApi<any>): Observable<IResponseApi<IEngagementApi>> {
    return this.http.patch<IResponseApi<IEngagementApi>>(ApiConfig.engagementsPath + '/game/' + id, data);
  }

  public getShakeTree(id: string): Observable<IResponseApi<IEngagementApi>> {
    return this.http.get<IResponseApi<IEngagementApi>>(ApiConfig.engagementsPath + '/game/' + id);
  }
}
