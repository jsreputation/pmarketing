import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EngagementsHttpsService {
  constructor(private http: HttpClient) {
  }

  public getEngagements() {
    return this.http.get('/assets/mocks/engagements.json');
  }
}
