import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EngagementsService {
  constructor(private http: HttpClient) {
  }

  public getEngagements() {
    return this.http.get('/assets/mocks/engagements.json');
  }
}
