import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ILoyalty, IStatisticCardConfig } from '@perxtech/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'dbshk-agent-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public displayPriceFn: () => Observable<string>;
  public subTitleFn: () => Observable<string>;
  public titleFn: () => Observable<string>;
  public summaryExpiringFn: (loyalty: ILoyalty) => Observable<string>;
  public pointToFn: () => Observable<string>;
  public memberFn: () => Observable<string>;
  public membershipExpiryFn: () => Observable<string>;
  public inviteStatistics: IStatisticCardConfig;
  public performanceStatistics: IStatisticCardConfig;

  constructor(
    protected datePipe: DatePipe,
    protected translate: TranslateService) {


    this.inviteStatistics = {
      cardTitle: 'Your invites', statistics: [{
        statisticTitle: 'Total Invites',
        value: 123,
        unit: 'invites'
      }]
    };

    this.performanceStatistics = {
      cardTitle: 'Performance by Campaign', statistics: [{
        statisticTitle: 'Mission 1',
        value: 456,
        unit: 'completed units',
        unitBeforeValue: true
      },
      {
        statisticTitle: 'Mission 2',
        value: 789,
        unit: 'completed units'
      }]
    };
  }

  public ngOnInit(): void {
    this.initTranslate();
  }

  private initTranslate(): void {
    this.titleFn = () => this.translate.get('PERFORMANCE.OVERALL_PERFORMANCE');
    this.summaryExpiringFn = (loyalty: ILoyalty) => of(`(${this.datePipe.transform(
      loyalty.endDate,
      'mediumDate'
    )})`);
    this.pointToFn = () => of('');
    this.subTitleFn = () => this.translate.get('PERFORMANCE.LOYALTY_POINT_UNIT'); // DBS$ / COMPASS Dollars
    this.memberFn = () => this.translate.get('PERFORMANCE.OVERVIEW_SUB_TITLE'); // you've earned
    this.membershipExpiryFn = () => of('');
    this.displayPriceFn = () => of('');
  }
}
