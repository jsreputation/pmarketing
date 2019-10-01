import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EngagementsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getEngagements(): Observable<IResponseApi<IEngagementApi[]>> {
    return this.http.get<IResponseApi<IEngagementApi[]>>(ApiConfig.engagementsPath + '/');
  }

  public getEngagement(id: string, type: string): Observable<IResponseApi<IEngagementApi>> {
    return this.http.get<IResponseApi<IEngagementApi>>(`${ApiConfig.engagementsPath}/${type}/${id}`);
  }

  public getEngagementType(): Observable<any> {
    return this.http.get('assets/actives/engagement-type.json')
      .pipe(
        map(res => (res as IGraphic[]))
      );
  }

  public getGamesType(): Observable<any> {
    return this.http.get('assets/actives/games-type.json')
      .pipe(
        map(res => (res as IGraphic[]))
      );
  }
}
