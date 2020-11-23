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
  flatMap,
  map,
  switchMap
} from 'rxjs/operators';
import {
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
  public locationData: IVoucherLocation[];
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
    this.getLoyalty();
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
        // merchantId can be null if reward is set up incorrectly on dashboard
        return this.vouchersService.getRewardLocations(this.rewardId);
      })).subscribe(
      (locations: IVoucherLocation[] ) => {
        if (locations.length > 0) {
          this.locationData = locations;
          this.bookingForm.controls.location.setValidators([Validators.required]);
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

  private getLoyalty(): void {
    this.loyaltyService.getLoyalties().pipe(
      switchMap((loyaltyes) => !loyaltyes || !loyaltyes.length ? of(null) : this.loyaltyService.getLoyalty(loyaltyes[0].id)
      ),
      map((loyalty) => {
        if (loyalty) {
          return loyalty;
        }
        throw new Error();
      })).subscribe((loyalty) => {
      this.loyalty = loyalty;
    }, () => console.error('Can\'t find loyalty'));
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
    this.loading = true;
    const currentPrice = this.prices.find((price) => price.id === this.bookingForm.value.priceId);
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

    forkJoin([...new Array(parseInt(this.bookingForm.value.quantity, 10))].map(() =>
      // there's currently only issue/reserve type so this simple iif will be sufficient
      iif(() => this.distributionType === VoucherDistributionTypes.issue,
        this.vouchersService.issueReward(this.rewardId,
          {
            priceId: this.bookingForm.value.priceId,
            locationId: this.bookingForm.value.location,
            sourceType: ''
          }),
        this.vouchersService.reserveReward(this.rewardId,
          {
            priceId: this.bookingForm.value.priceId,
            locationId: this.bookingForm.value.location,
            sourceType: ''
          })
        )
    )).subscribe(() => {
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
