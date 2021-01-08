import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IStatisticCardConfig, IConfig, ConfigService } from '@perxtech/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { CampaignInviteService } from '../../campaign-referrals/campaign-invite.service';
import { IGlobalTopScoreResponse, IInviteResponse } from '../../campaign-referrals/models/campaign-referral.model';
import { IDbshkConfig } from '../../model/IDbshk.model';

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
  public topScoreMessageFn: () => Observable<string>;
  public topScoreUnitFn: () => Observable<string>;
  public topScoreValueFn: () => Observable<number>;
  public inviteStatCardTitle: () => Observable<string>;
  public inviteStatTitle: () => Observable<string>;
  public inviteStatUnit: () => Observable<string>;
  public inviteStatistics: IStatisticCardConfig;
  public performanceStatistics: IStatisticCardConfig;
  public showPerformanceOverview: boolean;
  public showReferralProgressBar: boolean;
  constructor(
    protected datePipe: DatePipe,
    protected translate: TranslateService,
    protected campaignInviteService: CampaignInviteService,
    private configService: ConfigService) {
  }

  public ngOnInit(): void {
    this.initTranslate();
    this.getInviteStatistics();

    this.configService.readAppConfig<IDbshkConfig>().subscribe(
      (config: IConfig<IDbshkConfig>) => {
        if (config.custom) {
          this.showPerformanceOverview = config.custom.showPerformanceOverview ?
            config.custom.showPerformanceOverview : false;
          // Progress bar is within performance overview
          this.showReferralProgressBar = this.showPerformanceOverview && config.custom.showReferralProgressBar;
        }
      }
    );

    // DH-37
    this.performanceStatistics = {
      cardTitle: of('Performance by Campaign'),
      statistics: [{
        statisticTitle: of('MISSION 1'),
        value: of(456),
        unit: of('completed')
      },
      {
        statisticTitle: of('MISSION 2'),
        value: of(789),
        unit: of('completed')
      }]
    };
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

  private getGlobalTopScore(): Observable<IGlobalTopScoreResponse> {
    return this.campaignInviteService.getGlobalTopScore();
  }

  private initTranslate(): void {
    this.titleFn = () => this.translate.get('PERFORMANCE.OVERALL_PERFORMANCE');
    this.summaryExpiringFn = () => of('');
    this.pointToFn = () => of('');
    this.subTitleFn = () => this.translate.get('PERFORMANCE.LOYALTY_POINT_UNIT'); // DBS$ / COMPASS Dollars
    this.memberFn = () => this.translate.get('PERFORMANCE.OVERVIEW_SUB_TITLE'); // you've earned
    this.membershipExpiryFn = () => of('');
    this.displayPriceFn = () => of('');
    this.topScoreMessageFn = () => this.translate.get('PERFORMANCE.GLOBAL_TOP_SCORE');
    this.getGlobalTopScore().subscribe(score => this.topScoreValueFn = () => of(score.top_score));
    this.topScoreUnitFn = () => this.translate.get('PERFORMANCE.TOP_SCORE_UNIT');
    this.inviteStatCardTitle = () => this.translate.get('PERFORMANCE.INVITE_STAT_CARD_TITLE');
    this.inviteStatTitle = () => this.translate.get('PERFORMANCE.INVITE_STAT_SUB_TITLE');
    this.inviteStatUnit = () => this.translate.get('PERFORMANCE.INVITE_STAT_UNIT');
  }
}
