import { Injectable } from '@angular/core';
import { DashboardHttpService } from '@cl-core/http-services/dashboard-http.service';
import { combineLatest, Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { DataService, IData } from '@perx/chart';
import { ITotal } from '@cl-core/models/dashboard/total-active-interface';
import { DashboardGameCard } from '@cl-shared/models/dashboard/dashboard-game-card.interface';
import { HttpParamsOptions } from '@cl-core/models/params-map';

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

  public getTabValue(id: string, params: HttpParamsOptions): Observable<number | null> {
    return this.dataService.getData(id, params).pipe(
      map((response: IData) => response.rows),
      map(value => value.flat()
        .filter(v => typeof v === 'number')
        .reduce((acc: number, curr: number) => acc + curr, 0)
      ),
      catchError(() => of(null))
    );
  }

  public getTabValues(id: string, params: HttpParamsOptions): Observable<(string | number | null)[][] | null> {
    return this.dataService.getData(id, params).pipe(
      map((response: IData) => response.rows || null),
      catchError(() => of(null))
    );
  }

  public getTabsValue(idArray: string[], params: HttpParamsOptions): Observable<(number | null)[]> {
    return combineLatest(idArray.map(id => this.getTabValue(id, params)));
  }
}
