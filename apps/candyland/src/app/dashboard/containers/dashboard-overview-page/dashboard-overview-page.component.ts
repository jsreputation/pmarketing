import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { DashboardService } from '@cl-core/services';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DashboardChartsParametersService } from '../../services/dashboard-charts-parameters.service';

@Component({
  selector: 'cl-dashboard-overview-page',
  templateUrl: './dashboard-overview-page.component.html',
  styleUrls: ['./dashboard-overview-page.component.scss']
})
export class DashboardOverviewPageComponent implements OnInit, OnDestroy {
  public params: { [key: string]: string };
  public activeTab: any = 'activeCustomers';
  public tabs: ITotal[] = [
    {name: 'activeCustomers', id: 106, title: 'Total Active Customers'},
    {name: 'issuedRewards', id: 147, title: 'Total Issued Rewards'},
    {name: 'activeCampaigns', id: 153, title: 'Total Running Campaigns'}
  ];
  public tabsValue;

  public get tabsIds(): number[] {
    return this.tabs.map(tab => tab.id);
  }

  public getTabValue(index: number): number {
    return this.tabsValue ? this.tabsValue[index] : null;
  }

  constructor(private dashboardService: DashboardService,
              private cd: ChangeDetectorRef,
              private chartsParametersService: DashboardChartsParametersService) {
  }

  public ngOnInit(): void {
    this.handelChartsParamsChanges();
  }

  public ngOnDestroy(): void {
  }

  private handelChartsParamsChanges(): void {
    this.chartsParametersService.params$
      .pipe(
        untilDestroyed(this),
        tap(value => this.params = value),
        switchMap(params => this.dashboardService.getTabsValue(this.tabsIds, params)),
        tap(value => this.tabsValue = value)
      )
      .subscribe(() => this.cd.detectChanges());
  }

  public selectedTab(value: string): void {
    this.activeTab = value;
  }

}
