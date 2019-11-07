import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IWInstantOutcomeEngagementAttributes } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class EngagementsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getEngagements(): Observable<IJsonApiListPayload<IWInstantOutcomeEngagementAttributes>> {
    return this.http.get<IJsonApiListPayload<IWInstantOutcomeEngagementAttributes>>(ApiConfig.engagementsPath + '/');
  }

  public getEngagement(id: string, type: string): Observable<IJsonApiPayload<IWInstantOutcomeEngagementAttributes>> {
    return this.http.get<IJsonApiPayload<IWInstantOutcomeEngagementAttributes>>(`${ApiConfig.basePath}/${type}/engagements/${id}`);
  }

  public getEngagementType(): Observable<IGraphic[]> {
    return this.http.get<IGraphic[]>('assets/actives/engagement-type.json')
      .pipe(
        map(res => (res as IGraphic[]))
      );
  }

  public getGamesType(): Observable<IGraphic[]> {
    return this.http.get<IGraphic[]>('assets/actives/games-type.json')
      .pipe(
        map(res => (res as IGraphic[]))
      );
  }
}
