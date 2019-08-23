import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { DashboardService } from '@cl-core/services';
import { DataService } from '@perx/chart';
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
  styleUrls: ['./dashboard-campaign-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardCampaignPageComponent implements OnInit, OnDestroy {
  public params: { [key: string]: string };
  public activeTab: ITotal;
  public tabs: ITotal[];

  constructor(private dashboardService: DashboardService,
              private dataService: DataService,
              private chartsParametersService: DashboardChartsParametersService,
              private cd: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.initTabs();
    this.handelChartsParamsChanges();
  }

  public ngOnDestroy(): void {
  }

  public selectedTab(tab): void {
    this.activeTab = tab;
  }

  private handelChartsParamsChanges(): void {
    this.chartsParametersService.params$.pipe(
      untilDestroyed(this)
    ).subscribe(value => {
      this.params = value;
      this.cd.detectChanges();
    });
  }

  private initTabs(): void {
    this.dashboardService.getDashboardCampaignsTabs()
      .pipe(
        tap(res => this.activeTab = res[0]),
        tap(res => this.tabs = res),
        map(res => res.map(item => item.id)),
        switchMap((idArray: number[]) =>
          combineLatest(this.getTabsValue$(idArray))
        ),
        tap(values => this.tabs.forEach((item, index) => item.value = values[index]))
      )
      .subscribe(() => {
        this.cd.detectChanges();
      });
  }

  private getTabsValue$(idArray: number[]): Observable<number | string>[] {
    return idArray.map(id =>
      this.dataService.getData(id, this.params)
        .pipe(
          map(response => response.rows[0][0])
        )
    );
  }

}
