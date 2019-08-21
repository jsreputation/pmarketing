import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { DashboardService } from '@cl-core/services/dashboard.service';
export enum DictionaryTotal {
  activeCustomers = 'activeCustomers',
  issuedRewards = 'issuedRewards',
  activeCampaigns = 'activeCampaigns',
}
@Component({
  selector: 'cl-dashboard-campaign-page',
  templateUrl: './dashboard-campaign-page.component.html',
  styleUrls: ['./dashboard-campaign-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardCampaignPageComponent implements OnInit {
  // public gameCard$: Observable<DashboardGameCard[]>;
  public dashboardData: ITotal[];
  public activeTab: any = 'activeCustomers';
  public mapTotal = {
    activeCustomers: 'Total Active Customers',
    issuedRewards: 'Total Issued Rewards',
    activeCampaigns: 'Total Running Campaigns'
  };
  public dictionaryTotal = DictionaryTotal;

  constructor(private dashboardService: DashboardService,
              private cd: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    // this.getGameCard();
    this.getTotalActive();
  }

  public selectedTab(tab): void {
    this.activeTab = tab.value;
  }

  // private getGameCard(): void {
  //   this.gameCard$ = this.dashboardService.getDashboardGameCard();
  // }

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
        console.log(res);
        this.dashboardData = res;
        this.cd.detectChanges();
      });
  }

}
