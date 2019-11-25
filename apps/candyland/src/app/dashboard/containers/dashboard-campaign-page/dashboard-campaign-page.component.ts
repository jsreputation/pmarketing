import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { switchMap, tap, takeUntil } from 'rxjs/operators';

import { DashboardService } from '@cl-core/services';
import { DashboardChartsParametersService } from '../../services/dashboard-charts-parameters.service';

export enum DictionaryTotal {
  activeCustomers = 'activeCustomers',
  issuedRewards = 'issuedRewards',
  activeCampaigns = 'activeCampaigns',
}

@Component({
  selector: 'cl-dashboard-campaign-page',
  templateUrl: './dashboard-campaign-page.component.html',
  styleUrls: ['./dashboard-campaign-page.component.scss']
})
export class DashboardCampaignPageComponent implements OnInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  public params: { [key: string]: string };
  public activeTab: string = 'survey';
  public tabs: ITotal[] = [
    { id: 174, name: 'survey', title: 'CAMPAIGN_GRAPHIC_PAGE.NAV_TITLE_SURVEY' },
    { id: 181, name: 'games', title: 'CAMPAIGN_GRAPHIC_PAGE.NAV_TITLE_GAMES' },
    { id: 173, name: 'stamps', title: 'CAMPAIGN_GRAPHIC_PAGE.NAV_TITLE_STAMPS' },
    { id: 180, name: 'reward', title: 'CAMPAIGN_GRAPHIC_PAGE.NAV_TITLE_INSTANT_REWARD' }
  ];
  public tabsValue: any;
  public activeCampaigns: number;

  public get tabsIds(): number[] {
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
    this.handelActiveCampaigns();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public selectedTab(tab: any): void {
    this.activeTab = tab;
  }

  private handelChartsParamsChanges(): void {
    this.chartsParametersService.params$
      .pipe(
        tap(value => this.params = value),
        switchMap(params => this.dashboardService.getTabsValue(this.tabsIds, params)),
        tap(value => this.tabsValue = value),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.cd.detectChanges());
  }

  private handelActiveCampaigns(): void {
    this.chartsParametersService.params$
      .pipe(
        switchMap(params => this.dashboardService.getTabValue(176, params)),
        tap(value => this.activeCampaigns = value),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.cd.detectChanges());
  }

}
