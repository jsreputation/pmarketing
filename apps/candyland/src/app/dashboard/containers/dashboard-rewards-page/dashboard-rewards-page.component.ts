import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { DashboardService } from '@cl-core/services';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DashboardChartsParametersService } from '../../services/dashboard-charts-parameters.service';
export enum DictionaryTotal {
  activeCustomers = 'activeCustomers',
  issuedRewards = 'issuedRewards',
  activeCampaigns = 'activeCampaigns',
}
@Component({
  selector: 'cl-dashboard-rewards-page',
  templateUrl: './dashboard-rewards-page.component.html',
  styleUrls: ['./dashboard-rewards-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardRewardsPageComponent implements OnInit, OnDestroy {
  public params: { [key: string]: string };
  public dashboardData: ITotal[];
  public activeTab: any = 'activeCustomers';
  public mapTotal = {
    activeCustomers: 'Total Active Customers',
    issuedRewards: 'Total Issued Rewards',
    activeCampaigns: 'Total Running Campaigns'
  };
  public dictionaryTotal = DictionaryTotal;

  constructor(private dashboardService: DashboardService,
              private chartsParametersService: DashboardChartsParametersService,
              private cd: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    // this.getGameCard();
    this.getTotalActive();
    this.handelChartsParamsChanges();
  }

  public ngOnDestroy(): void {
  }

  public selectedTab(tab): void {
    this.activeTab = tab.value;
  }

  private handelChartsParamsChanges(): void {
    this.chartsParametersService.params$.pipe(
      untilDestroyed(this),
    ).subscribe(value => {
      this.params = value;
      this.cd.detectChanges();
    });
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
        this.cd.detectChanges();
      });
  }

}
