import { Injectable } from '@angular/core';
import { DashboardHttpService } from '@cl-core/http-services/dashboard-http.service';
import { combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { DataService } from '@perx/chart';
import { ITotal } from '@cl-core/models/dashboard/total-active-interface';
import { DashboardGameCard } from '@cl-shared/models/dashboard/dashboard-game-car.interface';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  constructor(private dashboardHttpService: DashboardHttpService, private dataService: DataService) { }

  public getDashboardGameCard(): Observable<DashboardGameCard[]> {
    return this.dashboardHttpService.getDashboardGameCard();
    // .pipe(
    //   map((res: DashboardGameCard[]) => res)
    // );
  }

  public getTotalActive(): Observable<ITotal[]> {
    return this.dashboardHttpService.getDashboardDataTotal()
      // .pipe(
      //   // map((res: ITotal[]) => res)
      // )
      ;
  }

  public getDashboardCampaignsTabs(): Observable<ITotal[]> {
    return this.dashboardHttpService.getDashboardCampaignsTabs();
  }

  public getTabValue(id: string, params: HttpParamsOptions): Observable<string | number | null> {
    return this.dataService.getData(+id, params).pipe(
      map(response => response.rows[0][0] || null)
    );
  }

  public getTabsValue(idArray: string[], params: HttpParamsOptions): Observable<(string | number | null)[]> {
    return combineLatest(idArray.map(id => this.getTabValue(id, params)));
  }
}
