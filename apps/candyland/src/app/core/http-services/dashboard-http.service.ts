import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardHttpService {
  constructor(private http: HttpClient) {
  }

  public getDashboardGameCard(): Observable<DashboardGameCard[]> {
    return this.http.get('assets/actives/dashboard-game-card.json')
      .pipe(
        map(res => (res as DashboardGameCard[]))
      );
  }
}
