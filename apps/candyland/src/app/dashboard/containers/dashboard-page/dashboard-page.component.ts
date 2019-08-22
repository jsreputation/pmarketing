import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { DashboardService } from '@cl-core/services';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs';
// import { map, tap } from 'rxjs/operators';
// import { DashboardService } from '@cl-core/services/dashboard.service';
export enum DictionaryTotal {
  activeCustomers = 'activeCustomers',
  issuedRewards = 'issuedRewards',
  activeCampaigns = 'activeCampaigns',
}
@Component({
  selector: 'cl-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DashboardPageComponent implements OnInit {
  public dateRange = new FormControl();
  public gameCard$: Observable<DashboardGameCard[]>;
  // public dashboardData: ITotal[];
  // public activeTab: any;
  // public mapTotal = {
  //   activeCustomers: 'Total Active Customers',
  //   issuedRewards: 'Total Issued Rewards',
  //   activeCampaigns: 'Total Running Campaigns'
  // };
  // public dictionaryTotal = DictionaryTotal;
  public navLinks = [
    {
      path: 'overview',
      label: 'Overview'
    },
    {
      path: 'rewards',
      label: 'Rewards'
    },
    {
      path: 'campaigns',
      label: 'Campaigns'
    }
  ];

  constructor(private dashboardService: DashboardService) {
  }

  public ngOnInit(): void {
    this.getGameCard();
    // this.getTotalActive();
    this.dateRange.valueChanges.subscribe(value => console.log(value));
  }

  // public selectedTab(tab): void {
  //   this.activeTab = tab.value;
  // }

  private getGameCard(): void {
    this.gameCard$ = this.dashboardService.getDashboardGameCard();
  }

  // private getTotalActive(): void {
  //   this.dashboardService.getTotalActive()
  //     .pipe(
  //       tap(res => this.activeTab = res[0].name),
  //       map((res) => {
  //       return res.map(item => {
  //         item.title = this.mapTotal[item.name];
  //         return item;
  //       });
  //     }))
  //     .subscribe((res) => {
  //       this.dashboardData = res;
  //     });
  // }

}
