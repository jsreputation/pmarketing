import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiConfig } from '@cl-core/api-config';

@Injectable({
  providedIn: 'root'
})
export class StampHttpService {

  constructor(private http: HttpClient) {
  }

  public getStampsData(): Observable<IStampsDefaultValue> {
    return this.http.get<IStampsDefaultValue>('assets/actives/stamps/stamps-data.json');
  }

  public createStamp(data: IJsonApiItem<any>): Observable<IResponseApi<IEngagementApi>> {
    return this.http.post<IResponseApi<IEngagementApi>>(ApiConfig.stampsPath + '/', data);
  }

  public updateStamp(id: string, data: IResponseApi<any>): Observable<IResponseApi<IEngagementApi>> {
    return this.http.patch<IResponseApi<IEngagementApi>>(ApiConfig.engagementsPath + '/stamps/' + id, data);
  }

  public getStamp(id: string): Observable<IResponseApi<IEngagementApi>> {
    return this.http.get<IResponseApi<IEngagementApi>>(ApiConfig.engagementsPath + '/stamps/' + id);
  }
}
