import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ApiConfig } from '@cl-core/api-config';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { IWEngagementAttributes, IJsonApiListPayload, IJsonApiItemPayload } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class EngagementsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getEngagements(): Observable<IJsonApiListPayload<IWEngagementAttributes>> {
    return this.http.get<IJsonApiListPayload<IWEngagementAttributes>>(ApiConfig.engagementsPath + '/');
  }

  public getEngagement(id: string, type: string): Observable<IJsonApiItemPayload<IWEngagementAttributes>> {
    return this.http.get<IJsonApiItemPayload<IWEngagementAttributes>>(`${ApiConfig.basePath}/${type}/engagements/${id}`);
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
