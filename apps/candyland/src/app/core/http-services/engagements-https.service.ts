import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IJsonApiListPayload } from './jsonapi.payload';

@Injectable({
  providedIn: 'root'
})
export class EngagementsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getEngagements(): Observable<IJsonApiListPayload<any>> {
    return this.http.get<IJsonApiListPayload<any>>(ApiConfig.engagementsPath + '/');
  }

  public getEngagement(id: string): Observable<any> {
    return this.http.get<any>(ApiConfig.engagementsPath + '/' + id);
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
