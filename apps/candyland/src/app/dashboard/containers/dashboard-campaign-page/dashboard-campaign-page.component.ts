import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { combineLatest, Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { DashboardService } from '@cl-core/services/dashboard.service';
import { DataService } from '@perx/chart';

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
  public activeTab: ITotal;
  public tabs: ITotal[];
  public params: { [key: string]: string };

  constructor(private dashboardService: DashboardService,
              private dataService: DataService,
              private cd: ChangeDetectorRef) {
    this.params = {
      start_date: '2019-07-01',
      end_date: '2019-08-31'
    };
  }

  public ngOnInit(): void {
    this.initTabs();
  }

  public selectedTab(tab): void {
    console.log(tab);
    this.activeTab = tab;
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
      .subscribe((res) => {
        console.log(res);
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
