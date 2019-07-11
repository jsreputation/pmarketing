import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DashboardHttpService } from '@cl-core/http-services/dashboard-http.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'cl-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit {
  public gameCard$: Observable<DashboardGameCard[]>;
  constructor(private dashboardHttpService: DashboardHttpService) { }

  ngOnInit() {
    this.getGameCard();
  }

  private getGameCard(): void {
    this.gameCard$ = this.dashboardHttpService.getDashboardGameCard();
  }

}
