import { Injectable } from '@angular/core';
import { EngagementsHttpsService } from '@perxtech/whistler-services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { EngagementTypeAPIMapping } from '@cl-core/models/engagement/engagement-type.enum';
import { IWEngagementAttributes, IJsonApiItemPayload, IJsonApiListPayload } from '@perxtech/whistler';
import { IEngagementType } from '@cl-core/models/engagement/engagement.interface';
import { HttpClient } from '@angular/common/http';
import { IGraphic } from '@cl-core/models/graphic.interface';

@Injectable({
  providedIn: 'root'
})
export class EngagementsService {
  constructor(private http: EngagementsHttpsService, public httpClient: HttpClient) { }

  public getEngagements(): Observable<IEngagementType[]> {
    return this.http.getEngagements()
      .pipe(
        map((res: IJsonApiListPayload<IWEngagementAttributes>) =>
          res.data.map(item => EngagementHttpAdapter.transformEngagementHandler(item))
            .filter(e => e !== undefined)
        )
      );
  }

  public getEngagement(id: string, type: string): Observable<IEngagementType> {
    const eType = EngagementTypeAPIMapping[type].replace('_', '-');
    return this.http.getEngagement(id, eType).pipe(
      map((res: IJsonApiItemPayload<IWEngagementAttributes>) => EngagementHttpAdapter.transformEngagementHandler(res.data, type))
    );
  }

  public getEngagementType(): Observable<IGraphic[]> {
    return this.httpClient.get<IGraphic[]>('assets/actives/engagement-type.json')
      .pipe(
        map(res => (res as IGraphic[]))
      );
  }

  public getGamesType(): Observable<IGraphic[]> {
    return this.httpClient.get<IGraphic[]>('assets/actives/games-type.json')
      .pipe(
        map(res => (res as IGraphic[]))
      );
  }
}
