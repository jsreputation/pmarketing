import { Injectable } from '@angular/core';
import { DashboardHttpService } from '@cl-core/http-services/dashboard-http.service';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private dashboardHttpService: DashboardHttpService) { }

  public getDashboardGameCard(): Observable<any> {
    return this.dashboardHttpService.getDashboardGameCard()
      .pipe(
        map((res: DashboardGameCard[]) => res )
      );
  }

  public getTotalActive(): Observable<ITotal[]> {
    return this.dashboardHttpService.getDashboardDataTotal()
      .pipe(
        map((res: ITotal[]) => res)
      );
  }
}
