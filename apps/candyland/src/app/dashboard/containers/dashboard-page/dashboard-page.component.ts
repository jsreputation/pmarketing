import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { DashboardService } from '@cl-core/services/dashboard.service';

@Component({
  selector: 'cl-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit {
  public gameCard$: Observable<DashboardGameCard[]>;
  public dashboardData: ITotalActive;
  constructor(private dashboardService: DashboardService) { }

  ngOnInit() {
    this.getGameCard();
    this.getTotalActive();
  }

  private getGameCard(): void {
    this.gameCard$ = this.dashboardService.getDashboardGameCard();
  }

  private getTotalActive(): void {
    this.dashboardService.getTotalActive()
      .subscribe((res) => this.dashboardData = res);
  }

}
