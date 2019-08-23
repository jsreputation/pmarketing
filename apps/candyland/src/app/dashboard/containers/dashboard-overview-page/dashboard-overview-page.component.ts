import { Component, OnInit, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { DashboardService } from '@cl-core/services/dashboard.service';
import { DataService } from '@perx/chart';
import { combineLatest, Observable } from 'rxjs';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { DashboardChartsParametersService } from '../../services/dashboard-charts-parameters.service';

export enum DictionaryTotal {
  activeCustomers = 'activeCustomers',
  issuedRewards = 'issuedRewards',
  activeCampaigns = 'activeCampaigns',
}

@Component({
  selector: 'cl-dashboard-overview-page',
  templateUrl: './dashboard-overview-page.component.html',
  styleUrls: ['./dashboard-overview-page.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardOverviewPageComponent implements OnInit, OnDestroy {
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
              private dataService: DataService,
              private chartsParametersService: DashboardChartsParametersService,
              private cd: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.getTotalActive();
    this.addTabsValue(this.getTabsValue$([106, 147, 106]));
    this.handelChartsParamsChanges();
  }

  public ngOnDestroy(): void {
  }

  private handelChartsParamsChanges() {
    this.chartsParametersService.params$.pipe(
      untilDestroyed(this),
      tap(value => console.log(value))
    ).subscribe(value => {
      this.params = value;
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

  private addTabsValue(requestArray$: Observable<number | string>[]): void {
    combineLatest(requestArray$).subscribe((data: number[]) => {
      this.dashboardData.forEach((item, index) => item.value = data[index]);
    });
  }

  public selectedTab(tab): void {
    this.activeTab = tab.value;
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
        console.log(res);
        this.dashboardData = res;
        this.cd.detectChanges();
      });
  }

}
