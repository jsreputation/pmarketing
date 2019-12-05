import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';

import { Subject } from 'rxjs';
import { switchMap, tap, takeUntil, filter } from 'rxjs/operators';

import { DashboardService } from '@cl-core/services';
import { DashboardChartsParametersService } from '../../services/dashboard-charts-parameters.service';
import { CardType } from '@perx/chart';
import { ITotal } from '@cl-core/models/dashboard/total-active-interface';
import { FormControl } from '@angular/forms';

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
    { id: 'campaigns_total_running_survey_campaigns', name: 'survey', title: 'CAMPAIGN_GRAPHIC_PAGE.NAV_TITLE_SURVEY' },
    { id: 'campaigns_survey_engagement_rate', name: 'games', title: 'CAMPAIGN_GRAPHIC_PAGE.NAV_TITLE_GAMES' },
    { id: 'campaigns_active_stamps_campaign', name: 'stamps', title: 'CAMPAIGN_GRAPHIC_PAGE.NAV_TITLE_STAMPS' },
    { id: 'campaigns_active_instant_rewards_campaigns', name: 'reward', title: 'CAMPAIGN_GRAPHIC_PAGE.NAV_TITLE_INSTANT_REWARD' }
  ];
  public tabsValue: any;
  public activeCampaigns: number;
  public ct: typeof CardType = CardType;
  public tableSearch: FormControl = new FormControl();

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
    this.handleChartsParamsChanges();
    this.handleActiveCampaigns();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public selectedTab(tab: any): void {
    this.activeTab = tab;
  }

  private handleChartsParamsChanges(): void {
    this.chartsParametersService.params$
      .pipe(
        tap(value => this.params = value),
        switchMap(params => this.dashboardService.getTabsValue(this.tabsIds, params)),
        tap(value => this.tabsValue = value),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.cd.detectChanges());
  }

  private handleActiveCampaigns(): void {
    this.chartsParametersService.params$
      .pipe(
        switchMap(params => this.dashboardService.getTabValue('campaigns_total_running_campaigns', params)),
        filter(value => typeof value === 'number'),
        tap((value: number) => this.activeCampaigns = value),
        takeUntil(this.destroy$),
      )
      .subscribe(() => this.cd.detectChanges());
  }

}
