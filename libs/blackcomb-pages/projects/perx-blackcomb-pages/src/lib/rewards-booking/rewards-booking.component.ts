import {
  Component,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import {
  IFlags,
  ILoyalty,
  IPrice,
  IReward,
  IVoucherLocation,
  IVoucherService,
  LoyaltyService,
  NotificationService,
  PopUpClosedCallBack,
  RewardsService,
  SettingsService,
  VoucherDistributionTypes
} from '@perxtech/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import {
  catchError,
  flatMap,
  map,
  switchMap,
  tap
} from 'rxjs/operators';
import {
  BehaviorSubject,
  forkJoin,
  iif,
  Observable,
  of,
  throwError
} from 'rxjs';
import { oc } from 'ts-optchain';
import { globalCacheBusterNotifier } from 'ngx-cacheable';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-blackcomb-pages-rewards-booking',
  templateUrl: './rewards-booking.component.html',
  styleUrls: ['./rewards-booking.component.scss']
})
export class RewardsBookingComponent implements OnInit, PopUpClosedCallBack {

  public rewardId: number;
  public prices: IPrice[];
  public locationData: BehaviorSubject<IVoucherLocation[]> = new BehaviorSubject([]);
  private lastLocationPage: number = 1;
  private isCurrentLocationPageLoaded: boolean = false;
  public reward: IReward;
  public quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public bookingForm: FormGroup;
  public loading: boolean = false;
  private loyalty: ILoyalty;
  public chooseQuantity: boolean = false;
  public tncHTML: Observable<string>;
  private distributionType: VoucherDistributionTypes = VoucherDistributionTypes.issue;

  constructor(
    private rewardsService: RewardsService,
    private vouchersService: IVoucherService,
    private loyaltyService: LoyaltyService,
    private settingsService: SettingsService,
    private route: ActivatedRoute,
    private build: FormBuilder,
    private notificationService: NotificationService,
    private translate: TranslateService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.settingsService.getRemoteFlagsSettings().subscribe(
      (flags: IFlags) => {
        this.distributionType = oc(flags).voucherDistributionType(VoucherDistributionTypes.issue);
      }
    );
    this.getData();
    this.getLoyalty().subscribe(() => {}, () => console.error('Can\'t find loyalty'));
    this.buildForm();
  }

  private getData(): void {

    this.route.data.subscribe(
      ((dataObj) => {
        if (dataObj.chooseQuantity) {
          this.chooseQuantity = dataObj.chooseQuantity;
        }
      })
    );
    this.route.params.pipe(
      switchMap((param) => {
        this.rewardId = param.id;
        return forkJoin([
          this.rewardsService.getReward(this.rewardId),
          this.rewardsService.getRewardPricesOptions(this.rewardId)
        ]);
      })).pipe(
      flatMap((result) => {
        [this.reward, this.prices] = result;
        this.tncHTML = this.translate.get('BOOKING_PAGE.TNC');
        if (!this.reward.merchantId) {
          return throwError({ message: 'merchantId is required' });
        }

        // override the default 10 options if there are invetory limits
        if (this.reward.inventory &&
          this.reward.inventory.rewardLimitPerUserBalance &&
          this.reward.inventory.rewardTotalBalance &&
          this.reward.inventory.rewardLimitPerUserPerPeriodBalance) {
          let lowestBalance = Math.min(
            this.reward.inventory.rewardLimitPerUserBalance,
            this.reward.inventory.rewardTotalBalance,
            this.reward.inventory.rewardLimitPerUserPerPeriodBalance,
            10);
          // copy paste https://stackoverflow.com/a/33352604
          this.quantities = Array.from({length: lowestBalance}, (_, i) => i + 1)
        }
        // merchantId can be null if reward is set up incorrectly on dashboard
        return this.vouchersService.getRewardLocations(this.rewardId, this.lastLocationPage);
      })).subscribe(
      (locations: IVoucherLocation[] ) => {
        if (locations.length > 0) {
          this.updateRewardLocations(locations);
          this.bookingForm.controls.location.setValidators([Validators.required]);
          this.bookingForm.controls.location.updateValueAndValidity();
        }
      },
      () => {
        // validators will prevent form submission
        this.notificationService.addPopup({
          title: 'Sorry',
          text: 'We\'re unable to perform this transaction at this time'
        });
      }
    );
  }

  // to get first set of locations
  public getRewardLocationsData(): void {
    if (!this.isCurrentLocationPageLoaded) {
      return;
    }

    this.isCurrentLocationPageLoaded = false;
    this.vouchersService.getRewardLocations(this.rewardId, this.lastLocationPage).subscribe(
      (rewardLocations: IVoucherLocation[]) => {
        if (rewardLocations && rewardLocations.length) {
          this.updateRewardLocations(rewardLocations);
        }
      },
      () => {
        // validators will prevent form submission
        this.notificationService.addPopup({
          title: 'Sorry',
          text: 'We\'re unable to perform this transaction at this time'
        });
      }
    );
  }

  private updateRewardLocations(rewardLocations: IVoucherLocation[]): void {
    this.locationData.next([...this.locationData.getValue(), ...rewardLocations]);
    this.lastLocationPage++;
    this.isCurrentLocationPageLoaded = true;
  }

  private getLoyalty(): Observable<ILoyalty> {
    return this.loyaltyService.getLoyalties().pipe(
      switchMap((loyaltyes) => !loyaltyes || !loyaltyes.length ? of(null) : this.loyaltyService.getLoyalty(loyaltyes[0].id)
      ),
      map((loyalty) => {
        if (loyalty) {
          return loyalty;
        }
        throw new Error();
      }),
      tap((loyalty) => this.loyalty = loyalty)
    );
  }

  public buildForm(): void {
    this.bookingForm = this.build.group({
      quantity: [1, [Validators.required]],
      location: [null, []],
      priceId: [null, [Validators.required]],
      agreement: [false, [Validators.requiredTrue]]
    });
  }

  public submitForm(): void {
    if (!this.loyalty) {
      return;
    }
    this.loading = true;
    const currentPrice = this.prices.find((price) => price.id === this.bookingForm.value.priceId) || 0;
    // allow free rewards to go through
    if (!currentPrice || currentPrice.points === undefined || null) {
      this.loading =  false;
      return;
    }
    const totalCost = currentPrice.points * this.bookingForm.value.quantity;
    if (totalCost > this.loyalty.pointsBalance) {
      this.notificationService.addPopup({
        title: 'Sorry',
        text: 'You do not have enough points for this transaction'
      });
      this.loading =  false;
      return;
    }
    let failedIssuesOrRewards = 0;

    forkJoin([...new Array(parseInt(this.bookingForm.value.quantity, 10))].map(() =>
      // there's currently only issue/reserve type so this simple iif will be sufficient
      iif(() => this.distributionType === VoucherDistributionTypes.issue,
        this.vouchersService.issueReward(this.rewardId,
          {
            priceId: this.bookingForm.value.priceId,
            locationId: this.bookingForm.value.location,
            sourceType: ''
          }).pipe(
            catchError(error => {
              failedIssuesOrRewards += 1;
              return of(error);
            })
          ),
        this.vouchersService.reserveReward(this.rewardId,
          {
            priceId: this.bookingForm.value.priceId,
            locationId: this.bookingForm.value.location,
            sourceType: ''
          }).pipe(
            catchError(error => {
              failedIssuesOrRewards += 1;
              return of(error);
            })
          )
        )
    )).subscribe(() => {
      // update loyalty according to number of passes
      // console.info(result.find(res => res instanceof HttpErrorResponse), 'see fails');
      this.loyalty.pointsBalance -= (this.bookingForm.value.quantity - failedIssuesOrRewards) * (currentPrice.points as number);
      // rather than call the service again and update loyalty, this is better
      // dynamically adjust local loyalty pointsBalance
      this.notificationService.addPopup({
        text: 'You can access your voucher from the wallet',
        title: 'Successfully collected!',
        buttonTxt: 'Go to Wallet',
        imageUrl: 'assets/congrats_image.png',
        afterClosedCallBack: this
      });
      globalCacheBusterNotifier.next();
      this.loading = false;
      this.router.navigateByUrl('wallet');
    }, (err) => {
      if (err.code === 40) {
        this.notificationService.addPopup({
          title: 'Sorry',
          text: 'You do not have enough points for this transaction'
        });
      }
      this.loading = false;
    });
  }

  public dialogClosed(): void {
    this.router.navigateByUrl('wallet');
  }
}
