import { Injectable } from '@angular/core';
import { EngagementsHttpsService } from '@cl-core/http-services/engagements-https.service';

@Injectable({
  providedIn: 'root'
})
export class EngagementsService {
  constructor(private http: EngagementsHttpsService) {
  }

  public getEngagements() {
    return this.http.getEngagements();
  }
}
