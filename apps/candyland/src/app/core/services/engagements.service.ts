import { Injectable } from '@angular/core';
import { EngagementsHttpsService } from '@cl-core/http-services/engagements-https.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { EngagementTypeAPIMapping } from '@cl-core/models/engagement/engagement-type.enum';

@Injectable({
  providedIn: 'root'
})
export class EngagementsService {
  constructor(private http: EngagementsHttpsService) {
  }

  public getEngagements(): Observable<IEngagement[]> {
    return this.http.getEngagements()
      .pipe(
        map((res: IResponseApi<IEngagementApi[]>) => res.data.map(item => EngagementHttpAdapter.transformEngagementHandler(item))
          .filter(e => e !== undefined)
        ),
      );
  }

  public getEngagement(id: string, type: string): Observable<IEngagement> {
    const eType = EngagementTypeAPIMapping[type];
    return this.http.getEngagement(id, eType).pipe(
      map((res: IResponseApi<IEngagementApi>) => EngagementHttpAdapter.transformEngagementHandler(res.data, type)),
    );
  }

  public getEngagementType(): Observable<IGraphic[]> {
    return this.http.getEngagementType();
  }

  public getGamesType(): Observable<IGraphic[]> {
    return this.http.getGamesType();
  }
}
