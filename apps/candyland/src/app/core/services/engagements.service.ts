import { Injectable } from '@angular/core';
import { EngagementsHttpsService } from '@cl-core/http-services/engagements-https.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { EngagementTypeAPIMapping } from '@cl-core/models/engagement/engagement-type.enum';
import { IWEngagementAttributes } from '@perx/whistler';
import { IEngagementType } from '@cl-core/models/engagement/engagement.interface';

@Injectable({
  providedIn: 'root'
})
export class EngagementsService {
  constructor(private http: EngagementsHttpsService) {
  }

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
    const eType = EngagementTypeAPIMapping[type];
    return this.http.getEngagement(id, eType).pipe(
      map((res: IJsonApiPayload<IWEngagementAttributes>) => EngagementHttpAdapter.transformEngagementHandler(res.data, type))
    );
  }

  public getEngagementType(): Observable<IGraphic[]> {
    return this.http.getEngagementType();
  }

  public getGamesType(): Observable<IGraphic[]> {
    return this.http.getGamesType();
  }
}
