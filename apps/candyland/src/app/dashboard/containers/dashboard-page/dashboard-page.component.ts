import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { DashboardService } from '@cl-core/services/dashboard.service';
export enum DictionaryTotal {
  activeCustomers = 'activeCustomers',
  issuedRewards = 'issuedRewards',
  activeCampaigns = 'activeCampaigns',
}
@Component({
  selector: 'cl-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit {
  public gameCard$: Observable<DashboardGameCard[]>;
  public dashboardData: ITotal[];
  public activeTab: any;
  public mapTotal = {
    activeCustomers: 'Total Active Customers',
    issuedRewards: 'Total Issued Rewards',
    activeCampaigns: 'Total Running Campaigns'
  };
  public dictionaryTotal = DictionaryTotal;
  constructor(private dashboardService: DashboardService) {
  }

  public ngOnInit(): void {
    this.getGameCard();
    this.getTotalActive();
  }

  public selectedTab(tab): void {
    this.activeTab = tab.value;
  }

  private getGameCard(): void {
    this.gameCard$ = this.dashboardService.getDashboardGameCard();
  }

  private getTotalActive(): void {
    this.dashboardService.getTotalActive()
      .pipe(
        tap(res => this.activeTab = res[0].name),
        map((res) => {
        return res.map(item => {
          item.title = this.mapTotal[item.name];
          return item;
        });
      }))
      .subscribe((res) => {
        this.dashboardData = res;
      });
  }

}
