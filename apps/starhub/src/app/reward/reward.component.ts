import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  ConfigService,
  ILoyaltyTierInfo,
  IReward,
  IVoucherService,
  NotificationService,
  RewardsService,
  SettingsService,
  IFlags
} from '@perxtech/core';
import { filter, map, switchMap } from 'rxjs/operators';
import { AnalyticsService, PageType } from '../analytics.service';
import { IMacaron, MacaronService } from '../services/macaron.service';
import { HttpErrorResponse } from '@angular/common/http';
import { ErrorMessageService } from '../utils/error-message/error-message.service';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  public reward: IReward;
  public isButtonEnable: boolean = true;
  public loadingSubmit: boolean = false;
  public isRewardsDetailsFetched: boolean = false;
  public macaron: IMacaron | null;
  public showOperatingHours: boolean = false;

  constructor(
    private location: Location,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private rewardsService: RewardsService,
    private vouchersService: IVoucherService,
    private notificationService: NotificationService,
    private analyticsService: AnalyticsService,
    private macaronService: MacaronService,
    private configService: ConfigService,
    private errorMessageService: ErrorMessageService,
    private settingsService: SettingsService
  ) { }

  public ngOnInit(): void {
    this.configService
      .readAppConfig()
      .pipe(
        switchMap(() => this.activeRoute.queryParams),
        filter((params: Params) => params.id), // ignore anything not related to reward id
        map((params: Params) => params.id), // get reward id
        switchMap((id: number) => this.rewardsService.getReward(id)) // get the full reward information
      )
      .subscribe((reward: IReward) => {
        this.reward = reward;
        if ((window as any).appboy) {
          (window as any).appboy.logCustomEvent('user_view_reward', {
            reward_id: reward.id,
            reward_name: reward.name
          });
        }
        if (reward.categoryTags && reward.categoryTags.length > 0) {
          const category = reward.categoryTags[0].title;
          this.analyticsService.addEvent({
            pageName: `rewards:discover:${category.toLowerCase()}:${reward.name}`,
            pageType: PageType.detailPage,
            siteSectionLevel2: 'rewards:discover',
            siteSectionLevel3: `rewards:discover:${category.toLowerCase()}`
          });
        }

        this.updateRewardStatus();

        if (reward.loyalty && reward.loyalty.length) {
          this.isButtonEnable = reward.loyalty.some((tier: ILoyaltyTierInfo) => tier.attained && !tier.sneakPeek);
        }

        if (
          reward.inventory &&
          reward.inventory.rewardLimitPerUserBalance === 0
        ) {
          this.isButtonEnable = false;
        }
      });

    this.settingsService.getRemoteFlagsSettings().subscribe((flags: IFlags) => {
      this.showOperatingHours = flags.showHappyHourOperatingHours ? flags.showHappyHourOperatingHours : false;
    });
  }

  public back(): void {
    this.location.back();
  }

  public save(): void {
    this.isButtonEnable = false;
    this.loadingSubmit = true;
    this.vouchersService.issueReward(this.reward.id).subscribe(
      () => this.router.navigate(['/home/vouchers']),
      (response) => {
        if (response instanceof HttpErrorResponse) {
          this.errorMessageService.getErrorMessageByErrorCode(response.error.code, response.error.message)
            .subscribe(
              (message: string) => {
                if (response.status === 401) {
                  this.router.navigate([ '/error' ]);
                } else if (response.status === 429) {
                  this.notificationService.addSnack(message);
                  const retryAfter = response.headers.get('retry-after');
                  const retryAfterTime = retryAfter ? parseInt(retryAfter, 10)  * 1000 : 3000;
                  setTimeout(() => {
                      this.save();
                  }, retryAfterTime);
                } else {
                  if (response.error.code === 4103) { // rewards run out due to reward limits
                    this.loadingSubmit = false;
                    this.refreshReward(); // refresh the reward to show fully redeemed
                    this.isButtonEnable = false;
                  } else {
                    this.loadingSubmit = false;
                    // change button back to enable which it originally is, before save is triggered
                    this.isButtonEnable = true;
                  }
                  this.notificationService.addSnack(message);
                }
              }
            );
        }
      }
    );
  }

  public disableButtonOnExpired(): void {
    this.isButtonEnable = false;
  }

  private refreshReward(): void {
    this.rewardsService.getReward(this.reward.id).subscribe(
      (reward) => {
        this.reward = reward;
        this.updateRewardStatus()
      }
    );
  }

  private updateRewardStatus(): void {
    this.macaron = this.macaronService.getMacaron(this.reward);
    this.isRewardsDetailsFetched = true;
    if (this.macaron !== null) {
      this.isButtonEnable = this.macaron.isButtonEnabled;
    }
  }
}
