import { Injectable } from '@angular/core';
import { EngagementsHttpsService } from '@cl-core/http-services/engagements-https.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EngagementsService {
  constructor(private http: EngagementsHttpsService) {
  }

  public getEngagements(): Observable<any> {
    return this.http.getEngagements();
  }

  public getEngagementType(): Observable<any> {
    return this.http.getEngagementType();
  }

  public getGamesType(): Observable<any> {
    return this.http.getGamesType();
  }
}
