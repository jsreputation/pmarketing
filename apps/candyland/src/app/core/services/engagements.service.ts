import { Injectable } from '@angular/core';
import { EngagementsHttpsService } from '@cl-core/http-services/engagements-https.service';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';

@Injectable({
  providedIn: 'root'
})
export class EngagementsService {
  constructor(private http: EngagementsHttpsService) {
  }

  public getEngagements(): Observable<IEngagement[]> {
    return this.http.getEngagements()
      .pipe(
        map((res: any) => res.data.map(item => EngagementHttpAdapter.transformEngagementHandler(item)))
      );
  }

  public getEngagement(id: string): Observable<any> {
    return this.http.getEngagement(id)
      .pipe(
        tap(data => console.log('engagement api', data)),
        map((res: any) => EngagementHttpAdapter.transformEngagementHandler(res.data)),
        tap(data => console.log('engagement transform', data)),
      );
  }

  public getEngagementType(): Observable<any> {
    return this.http.getEngagementType();
  }

  public getGamesType(): Observable<any> {
    return this.http.getGamesType();
  }
}
