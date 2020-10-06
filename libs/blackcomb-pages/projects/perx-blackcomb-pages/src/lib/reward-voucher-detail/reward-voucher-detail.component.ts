import {
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import {
  BehaviorSubject,
  Observable, of,
  Subject
} from 'rxjs';
import {
  CampaignRewardMode,
  ConfigService,
  IConfig,
  ILoyalty,
  IPrice,
  IReward,
  IVoucherService,
  LoyaltyService,
  NotificationService,
  ProgressBarFields,
  RewardsService,
  Voucher
} from '@perxtech/core';
import {
  ActivatedRoute,
  Params,
} from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  filter,
  map,
  switchMap,
  takeUntil,
  tap
} from 'rxjs/operators';

@Component({
  selector: 'perx-blackcomb-pages-reward-voucher-detail',
  templateUrl: './reward-voucher-detail.component.html',
  styleUrls: ['./reward-voucher-detail.component.scss']
})
export class RewardVoucherDetailComponent implements OnInit, OnDestroy {
  public reward$: Observable<IReward>;
  public displayPriceFn: (price: IPrice) => string;
  private destroy$: Subject<void> = new Subject();
  public descriptionLabel: Observable<string>;
  public tncLabel: Observable<string>;
  public codeLabel: Observable<string>;
  public expiryLabel: Observable<string>;
  public buttonLabel: string = 'Redeem Your Reward';
  public appConfig: IConfig<void>;
  public rewardData: IReward;
  public loyalty: ILoyalty;
  public waitForSubmission: boolean = false;
  public voucherId: number;
  public rewardId: number;
  public maxRewardCost?: number;
  public rewardProgress: Partial<ProgressBarFields & { barHeadLine: string }>; // stages always 2
  public rewardType: CampaignRewardMode;
  public voucher$: Observable<Voucher & { securityNumber: string, cardNumber: string }>;
  public barHeadLine: string;
  public useRewardDescription: string;
  public doneText: string;
  public showNoCodeReward: BehaviorSubject<boolean> =  new BehaviorSubject<boolean>(false);
  public showNoCodeReward$: Observable<boolean>;

  constructor(
    private rewardsService: RewardsService,
    private vouchersService: IVoucherService,
    private loyaltyService: LoyaltyService,
    private activeRoute: ActivatedRoute,
    private translate: TranslateService,
    private configService: ConfigService,
    private notificationService: NotificationService,
    // private router: Router
  ) { }

  public ngOnInit(): void {
    this.showNoCodeReward$ = this.showNoCodeReward.asObservable();
    const { current, stageLabels, rewardType, barHeadLine, useRewardDescription } = history.state;
    this.barHeadLine = barHeadLine;
    this.useRewardDescription = useRewardDescription;

    this.rewardType = rewardType;
    if (current !== (undefined) && stageLabels) {
      this.rewardProgress = {
        current: history.state.current,
        stages: 2,
        stageLabels: history.state.stageLabels
      };
    }
    this.configService.readAppConfig<void>()
      .subscribe((config: IConfig<void>) => this.appConfig = config);

    this.loyaltyService.getLoyalties().pipe(
      map(loyalties => loyalties[0])
    ).subscribe(
      (loyalty: ILoyalty) => this.loyalty = loyalty
    );
    if (this.activeRoute.params) {
      this.initTranslate();
      this.reward$ = this.activeRoute.params
        .pipe(
          filter((ps: Params) => ps.rewardId),
          map((ps: Params) => Number.parseInt(ps.rewardId, 10)),
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
  }

  public buyReward(): void {
    this.waitForSubmission = true;
    this.showNoCodeReward.next(true);
    this.doneText = 'done';
  }

  private initTranslate(): void {
    this.descriptionLabel = of('FAQs'); // this.translate.get('REWARD.DESCRIPTION')
    this.tncLabel = this.translate.get('REWARD.TNC');
    this.codeLabel = this.translate.get('REWARD.CODE');
    this.expiryLabel = this.translate.get('REWARD.EXPIRY');
    if (this.activeRoute) {
      this.activeRoute.params
        .pipe(
          tap((ps: Params) => {
            if (ps.rewardId) {
              this.rewardId = Number.parseInt(ps.rewardId, 10);
            }
            if (ps.voucherId) {
              this.voucherId = Number.parseInt(ps.voucherId, 10);
            }
          }),
        ).subscribe();
    }
  }


  public navToRedeem(): void {
    this.voucher$ = this.vouchersService.get(this.voucherId).pipe(
      map((voucher: Voucher) => {
        const [ cardNumber = '', securityNumber = '' ] = (voucher.code && voucher.code.split('-')) || [];
        return ({
          ...voucher,
          securityNumber,
          cardNumber
        });
      }),
      tap(() => this.doneText = 'done')
    );
    // this.router.navigate(['redeem', this.voucherId]);
  }

  public copyCode(inputElement: any): void {
    inputElement.select();
    document.execCommand('copy');
    inputElement.setSelectionRange(0, 0);
    this.notificationService.addPopup({
      title: '',
      text: 'Code copied.'
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
