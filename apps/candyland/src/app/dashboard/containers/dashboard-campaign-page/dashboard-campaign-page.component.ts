import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { switchMap, tap } from 'rxjs/operators';
import { DashboardService } from '@cl-core/services';
import { DashboardChartsParametersService } from '../../services/dashboard-charts-parameters.service';
import { untilDestroyed } from 'ngx-take-until-destroy';

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
  public params: { [key: string]: string };
  public activeTab: string = 'survey';
  public tabs: ITotal[] = [
    {id: 174, name: 'survey', title: 'Survey'},
    {id: 181, name: 'games', title: 'Games'},
    {id: 173, name: 'stamps', title: 'Stamps'},
    {id: 180, name: 'reward', title: 'Instant Reward'}
  ];
  public tabsValue: any;
  public activeCampaigns: number;

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
    this.handelActiveCampaigns();
  }

  public ngOnDestroy(): void {
  }

  public selectedTab(tab: any): void {
    this.activeTab = tab;
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

  private handelActiveCampaigns(): void {
    this.chartsParametersService.params$
      .pipe(
        untilDestroyed(this),
        switchMap(params => this.dashboardService.getTabValue(176, params)),
        tap(value => this.activeCampaigns = value)
      )
      .subscribe(() => this.cd.detectChanges());
  }

}
