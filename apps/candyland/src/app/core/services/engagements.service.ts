import { Injectable } from '@angular/core';
import { EngagementsHttpsService } from '@cl-core/http-services/engagements-https.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Engagement } from '@cl-core/models/engagement.model';

@Injectable({
  providedIn: 'root'
})
export class EngagementsService {
  constructor(private http: EngagementsHttpsService) {
  }

  public getEngagements(): Observable<Engagement[]> {
    return this.http.getEngagements()
      .pipe(
        map((res: any) => res.data.map(item => new Engagement(item)))
      );
  }

  public getEngagementType(): Observable<any> {
    return this.http.getEngagementType();
  }

  public getGamesType(): Observable<any> {
    return this.http.getGamesType();
  }
}
