import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ITotal } from '@cl-core/models/dashboard/total-active-interface';
import { DashboardGameCard } from '@cl-shared/models/dashboard/dashboard-game-car.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardHttpService {
  constructor(private http: HttpClient) { }

  public getDashboardGameCard(): Observable<DashboardGameCard[]> {
    return this.http.get<DashboardGameCard[]>('assets/actives/dashboard/dashboard-game-card.json');
  }

  public getDashboardDataTotal(): Observable<ITotal[]> {
    return this.http.get<ITotal[]>('assets/actives/dashboard/total-active.json');
  }

  public getDashboardCampaignsTabs(): Observable<ITotal[]> {
    return this.http.get<ITotal[]>('assets/actives/dashboard/dashboard-campaigns-tabs.json');
  }
}
