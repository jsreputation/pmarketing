import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import {
  ConfigService,
  ErrorMessageService,
  IConfig,
  IFlags,
  ILoyalty,
  IMacaron,
  IPrice,
  IReward,
  IVoucherService,
  LoyaltyService,
  MacaronService,
  NotificationService,
  RewardsService,
  SettingsService,
  Voucher
} from '@perxtech/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, finalize, map, shareReplay, switchMap, takeUntil, tap } from 'rxjs/operators';
import { iif, Observable, of, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'perx-blackcomb-reward-details',
  templateUrl: './reward-details.component.html',
  styleUrls: ['./reward-details.component.scss']
})
export class RewardDetailsComponent implements OnInit, OnDestroy, AfterViewInit {
  public reward$: Observable<IReward>;
  public displayPriceFn: (price: IPrice) => string;
  private destroy$: Subject<void> = new Subject();
  public descriptionLabel: Observable<string>;
  public tncLabel: Observable<string>;
  public codeLabel: Observable<string>;
  public expiryLabel: Observable<string>;
  public buttonLabel: string = 'Redeem';
  public appConfig: IConfig<void>;
  public remoteFlags: IFlags;
  public rewardData: IReward;
  public loyalty: ILoyalty;
  public waitForSubmission: boolean = false;
  public isButtonEnable: boolean = true;
  public isRewardsDetailsFetched: boolean = false;
  public favDisabled: boolean = false;
  public macaron?: IMacaron | null = null;
  public isOperating?: boolean;
  public maxRewardCost?: number;
  public notAvailableLabel: string;
  public isPreviewReward: boolean = false;

  private initTranslate(): void {
    this.translate.get('REWARD.GET_VOUCHER').subscribe((text) => this.buttonLabel = text);
    this.translate.get('REWARD.N_A').subscribe((text) => this.notAvailableLabel = text);
    this.descriptionLabel = this.translate.get('REWARD.DESCRIPTION');
    this.tncLabel = this.translate.get('REWARD.TNC');
    this.codeLabel = this.translate.get('REWARD.CODE');
    this.expiryLabel = this.translate.get('REWARD.EXPIRY');
  }

  constructor(
    private rewardsService: RewardsService,
    private vouchersService: IVoucherService,
    private loyaltyService: LoyaltyService,
    private activeRoute: ActivatedRoute,
    private translate: TranslateService,
    private configService: ConfigService,
    private settingsService: SettingsService,
    private macaronService: MacaronService,
    private errorMessageService: ErrorMessageService,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  public ngOnInit(): void {

    this.checkPreviewMode();

    this.configService.readAppConfig<void>()
      .subscribe((config: IConfig<void>) => this.appConfig = config);

    this.settingsService.getRemoteFlagsSettings().subscribe((flags: IFlags) => {
      this.remoteFlags = flags;
    });

    this.initTranslate();
    this.loyaltyService.getLoyalties().pipe(
      // ---------------------------------------------------------------
      // NOTE: get only the loyalty where membershipState is ACTIVE
      // ---------------------------------------------------------------
      map((loyalties: ILoyalty[]) => loyalties.filter((loyalty) => loyalty.membershipState === 'active')[0])
    ).subscribe(
      (loyalty: ILoyalty) => this.loyalty = loyalty
    );
    this.reward$ = this.activeRoute.params
      .pipe(
        filter((ps: Params) => ps.id),
        map((ps: Params) => Number.parseInt(ps.id, 10)),
        switchMap((id: number) => this.rewardsService.getReward(id)),
        tap((reward: IReward) => {
          this.rewardData = reward;

          if (reward.inventory && reward.inventory.rewardTotalBalance === 0) {
            this.isButtonEnable = false;
          }

          {
            if (reward.displayProperties) {
              this.buttonLabel = reward.displayProperties.CTAButtonTxt || this.buttonLabel;
            }
          }
          this.maxRewardCost = reward.rewardPrice && reward.rewardPrice.length > 0 ? reward.rewardPrice
            .map((price) => price.points)
            .reduce((acc = 0, points) => acc >= (points || 0) ? acc : points) : 0;
        }),
        takeUntil(this.destroy$),
        shareReplay(1)
      );
  }

  public ngAfterViewInit(): void {
    this.reward$.subscribe((reward: IReward) => {
      this.macaron = this.macaronService.getMacaron(reward);
      this.isOperating = reward?.isOperating;
    });
  }

  public checkPreviewMode(): void {
    const urlParams = new URLSearchParams(window.location.search);
    const previewReward = urlParams.get('previewReward');
    this.isPreviewReward = Boolean(previewReward);
  }

  public buyReward(): void {
    this.waitForSubmission = true;
    if (this.appConfig && this.appConfig.showVoucherBookingFromRewardsPage) {
      this.router.navigateByUrl(`booking/${this.rewardData.id}`);
    } else {
      this.vouchersService.issueReward(this.rewardData.id, undefined, undefined)
        .subscribe(
          (res: Voucher) => this.router.navigate([`/voucher-detail/${res.id}`]),
          (err: HttpErrorResponse) => {


            if (err instanceof HttpErrorResponse) {
              this.errorMessageService.getErrorMessageByErrorCode(err.error.code, err.error.message)
                .subscribe(
                  (message: string) => {
                    if (err.error.code === 4103) { // rewards run out due to reward limits
                      this.refreshReward(); // refresh the reward to show fully redeemed
                      this.isButtonEnable = false;
                    } else {
                      // change button back to enable which it originally is, before save is triggered
                      this.isButtonEnable = true;
                    }
                    this.notificationService.addSnack(message);
                  }
                );
            }

            this.errorMessageService.getErrorMessageByErrorCode(err.error.code, err.error.message)
              .subscribe((message) => {
                this.notificationService.addSnack(message);
              });
            this.waitForSubmission = false; // allow user to retry again, re-enable button
          }
        );
    }
  }

  public rewardFavoriteHandler(rewardToggled: IReward): void {
    if (this.favDisabled) {
      return;
    }

    this.favDisabled = true;

    iif(() => (rewardToggled && (rewardToggled.favorite || false)),
      this.rewardsService.unfavoriteReward(rewardToggled.id),
      this.rewardsService.favoriteReward(rewardToggled.id)).pipe(
        tap(
          reward => {
            this.reward$ = of(reward);
          }
        ),
        finalize(() => setTimeout(() => {
          this.favDisabled = false;
        }, 500))
      ).subscribe();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private refreshReward(): void {
    this.rewardsService.getReward(this.rewardData.id).subscribe(
      (reward) => {
        this.rewardData = reward;
        this.updateRewardStatus();
      }
    );
  }

  private updateRewardStatus(): void {
    this.macaron = this.macaronService.getMacaron(this.rewardData);
    this.isRewardsDetailsFetched = true;
    if (this.macaron !== null) {
      this.isButtonEnable = this.macaron.isButtonEnabled;
    }
  }
}

