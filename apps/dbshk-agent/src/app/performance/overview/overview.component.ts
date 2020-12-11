import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IStatisticCardConfig } from '@perxtech/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CampaignInviteService } from '../../campaign-referrals/campaign-invite.service';
import { IInviteResponse } from '../../campaign-referrals/models/campaign-referral.model';

@Component({
  selector: 'dbshk-agent-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public displayPriceFn: () => Observable<string>;
  public subTitleFn: () => Observable<string>;
  public titleFn: () => Observable<string>;
  public summaryExpiringFn: () => Observable<string>;
  public pointToFn: () => Observable<string>;
  public memberFn: () => Observable<string>;
  public membershipExpiryFn: () => Observable<string>;
  public topScoreProgressFn: () => Observable<string>;
  public inviteStatCardTitle: () => Observable<string>;
  public inviteStatTitle: () => Observable<string>;
  public inviteStatUnit: () => Observable<string>;
  public inviteStatistics: IStatisticCardConfig;
  public performanceStatistics: IStatisticCardConfig;

  constructor(
    protected datePipe: DatePipe,
    protected translate: TranslateService,
    protected campaignInviteService: CampaignInviteService) {
  }

  public ngOnInit(): void {
    this.initTranslate();
    this.getInviteStatistics();
  }

  private getInviteStatistics(): void {
    this.inviteStatistics = {
      cardTitle: this.inviteStatCardTitle(),
      statistics: [{
        statisticTitle: this.inviteStatTitle(),
        value: this.campaignInviteService.getAllInvites().pipe(map((invites: IInviteResponse) => invites.data.length || 0)),
        unit: this.inviteStatUnit()
      }]
    };
  }

  private initTranslate(): void {
    this.titleFn = () => this.translate.get('PERFORMANCE.OVERALL_PERFORMANCE');
    this.summaryExpiringFn = () => of('');
    this.pointToFn = () => of('');
    this.subTitleFn = () => this.translate.get('PERFORMANCE.LOYALTY_POINT_UNIT'); // DBS$ / COMPASS Dollars
    this.memberFn = () => this.translate.get('PERFORMANCE.OVERVIEW_SUB_TITLE'); // you've earned
    this.membershipExpiryFn = () => of('');
    this.displayPriceFn = () => of('');
    this.topScoreProgressFn = () => this.translate.get('PERFORMANCE.GLOBAL_TOP_SCORE'); // global top score
    this.inviteStatCardTitle = () => this.translate.get('PERFORMANCE.INVITE_STAT_CARD_TITLE');
    this.inviteStatTitle = () => this.translate.get('PERFORMANCE.INVITE_STAT_SUB_TITLE');
    this.inviteStatUnit = () => this.translate.get('PERFORMANCE.INVITE_STAT_UNIT');
  }
}
