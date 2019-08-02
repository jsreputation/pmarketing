import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardHttpService {
  constructor(private http: HttpClient) {
  }

  public getDashboardGameCard(): Observable<any> {
    return this.http.get('assets/actives/dashboard/dashboard-game-card.json');
  }

  public getDashboardDataTotal(): Observable<any> {
    return this.http.get('assets/actives/dashboard/total-active.json');
  }
}
