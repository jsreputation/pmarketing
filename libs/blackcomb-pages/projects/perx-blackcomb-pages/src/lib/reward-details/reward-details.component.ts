import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  RewardsService,
  IReward,
  IPrice,
  IVoucherService,
  LoyaltyService,
  ILoyalty,
  Voucher,
  ConfigService,
  IConfig
} from '@perxtech/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, finalize, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { iif, Observable, of, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-blackcomb-reward-details',
  templateUrl: './reward-details.component.html',
  styleUrls: ['./reward-details.component.scss']
})
export class RewardDetailsComponent implements OnInit, OnDestroy {
  public reward$: Observable<IReward>;
  public displayPriceFn: (price: IPrice) => string;
  private destroy$: Subject<void> = new Subject();
  public descriptionLabel: Observable<string>;
  public tncLabel: Observable<string>;
  public codeLabel: Observable<string>;
  public expiryLabel: Observable<string>;
  public buttonLabel: string = 'Redeem';
  public appConfig: IConfig<void>;
  public rewardData: IReward;
  public loyalty: ILoyalty;
  public waitForSubmission: boolean = false;
  public favDisabled: boolean = false;

  public maxRewardCost?: number;
  private initTranslate(): void {
    this.translate.get('REWARD.GET_VOUCHER').subscribe((text) => this.buttonLabel = text);
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
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.configService.readAppConfig<void>()
      .subscribe((config: IConfig<void>) => this.appConfig = config);

    this.initTranslate();
    this.loyaltyService.getLoyalties().pipe(
      map(loyalties => loyalties[0])
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
          if (reward.displayProperties) {
            this.buttonLabel = reward.displayProperties.CTAButtonTxt || this.buttonLabel;
          }
          this.maxRewardCost = reward.rewardPrice && reward.rewardPrice.length > 0 ? reward.rewardPrice
            .map((price) => price.points)
            .reduce((acc = 0, points) => acc >= (points || 0) ? acc : points) : 0;
        }),
        takeUntil(this.destroy$)
      );
  }

  public buyReward(): void {
    this.waitForSubmission = true;
    if (this.appConfig && this.appConfig.showVoucherBookingFromRewardsPage) {
      this.router.navigateByUrl(`booking/${this.rewardData.id}`);
    } else {
      this.vouchersService.issueReward(this.rewardData.id, undefined, undefined)
        .subscribe(
          (res: Voucher) => this.router.navigate([`/voucher-detail/${res.id}`]),
          (_) => this.waitForSubmission = false // allow user to retry again, re-enable button
        );
    }
  }

  public rewardFavoriteHandler(rewardToggled: IReward): void {
    if (this.favDisabled) {
      return;
    }

    this.favDisabled = true;

    iif(() => (rewardToggled && (rewardToggled.favorite || false)),
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
}
