import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { switchMap, tap, takeUntil } from 'rxjs/operators';

import { DashboardService } from '@cl-core/services';
import { DashboardChartsParametersService } from '../../services/dashboard-charts-parameters.service';

@Component({
  selector: 'cl-dashboard-overview-page',
  templateUrl: './dashboard-overview-page.component.html',
  styleUrls: ['./dashboard-overview-page.component.scss']
})
export class DashboardOverviewPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<any> = new Subject();

  public params: { [key: string]: string };
  public activeTab: any = 'activeCustomers';
  public tabs: ITotal[] = [
    {name: 'activeCustomers', id: 106, title: 'Total Active Customers'},
    {name: 'issuedRewards', id: 147, title: 'Total Issued Rewards'},
    {name: 'activeCampaigns', id: 153, title: 'Total Running Campaigns'}
  ];
  public tabsValue: any;

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
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handelChartsParamsChanges(): void {
    this.chartsParametersService.params$
      .pipe(
        takeUntil(this.destroy$),
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
