import { Component, OnInit, ChangeDetectorRef, OnDestroy, ChangeDetectionStrategy, ViewRef } from '@angular/core';
import { Subject } from 'rxjs';
import { switchMap, tap, takeUntil } from 'rxjs/operators';

import { DashboardService } from '@cl-core/services';
import { DashboardChartsParametersService } from '../../services/dashboard-charts-parameters.service';
import { CardType } from '@perx/chart';
import { ITotal } from '@cl-core/models/dashboard/total-active-interface';

@Component({
  selector: 'cl-dashboard-overview-page',
  templateUrl: './dashboard-overview-page.component.html',
  styleUrls: ['./dashboard-overview-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardOverviewPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  public params: { [key: string]: string };
  public activeTab: any = 'activeCustomers';
  public tabs: ITotal[] = [
    { name: 'activeCustomers', id: 'overview_total_active_customer', title: 'OVERVIEW_GRAPHIC_PAGE.TOTAL_ACTIVE_CUSTOMERS' },
    { name: 'issuedRewards', id: 'overview_total_issued_rewards', title: 'OVERVIEW_GRAPHIC_PAGE.TOTAL_ISSUED_REWARDS' },
    { name: 'activeCampaigns', id: 'overview_total_running_campaigns', title: 'OVERVIEW_GRAPHIC_PAGE.TOTAL_RUNNING_CAMPAIGNS' }
  ];
  public tabsValue: any;
  public ct: typeof CardType = CardType;

  public get tabsIds(): string[] {
    return this.tabs.map(tab => tab.id);
  }

  public getTabValue(index: number): number {
    return this.tabsValue ? this.tabsValue[index] : null;
  }

  constructor(
    private dashboardService: DashboardService,
    private cd: ChangeDetectorRef,
    private chartsParametersService: DashboardChartsParametersService
  ) { }

  public ngOnInit(): void {
    this.handelChartsParamsChanges();
  }

  public ngOnDestroy(): void {
    this.cd.detach();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private handelChartsParamsChanges(): void {
    this.chartsParametersService.params$
      .pipe(
        tap(value => this.params = value),
        switchMap(params => this.dashboardService.getTabsValue(this.tabsIds, params)),
        tap(value => this.tabsValue = value),
        takeUntil(this.destroy$),
      )
      .subscribe(() => {
        if (this.cd !== null && this.cd !== undefined && !(this.cd as ViewRef).destroyed) {
          this.cd.detectChanges();
        }
      });
  }

  public selectedTab(value: string): void {
    this.activeTab = value;
  }

}
