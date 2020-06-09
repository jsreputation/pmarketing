import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {
  LocationsService,
  RewardsService,
  ILocation,
  IReward,
  NotificationService,
  LoyaltyService,
  ILoyalty,
  IPrice,
  IVoucherService,
  PopUpClosedCallBack
} from '@perxtech/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, flatMap, map } from 'rxjs/operators';
import { forkJoin, Observable, of, throwError } from 'rxjs';

@Component({
  selector: 'perx-blackcomb-pages-rewards-booking',
  templateUrl: './rewards-booking.component.html',
  styleUrls: ['./rewards-booking.component.scss']
})
export class RewardsBookingComponent implements OnInit, PopUpClosedCallBack {

  public rewardId: number;
  public prices: IPrice[];
  public locationData: Observable<ILocation[]>;
  public reward: IReward;
  public quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public bookingForm: FormGroup;
  private loyalty: ILoyalty;
  private merchantAllLocations: ILocation[] = [];
  private lastMerchantPage: number = 1;
  private isCurrentMerchantPageLoaded: boolean = false;
  private merchantId: number;

  constructor(
    private locationService: LocationsService,
    private rewardsService: RewardsService,
    private vouchersService: IVoucherService,
    private loyaltyService: LoyaltyService,
    private route: ActivatedRoute,
    private build: FormBuilder,
    private notificationService: NotificationService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.getData();
    this.getLoyalty();
    this.buildForm();
  }

  private getData(): void {
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
        if (!this.reward.merchantId) {
          return throwError({ message: 'merchantId is required' });
        }
        this.merchantId = this.reward.merchantId;
        // merchantId can be null if reward is set up incorrectly on dashboard
        return this.locationService.getFromMerchant(this.merchantId);
      })).subscribe(
      (merchantLocations: ILocation[]) => {
        console.log(merchantLocations, 'merchant locaitons what are yiu?')
        this.updateMerchantData(merchantLocations);
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
      quantity: [null, [Validators.required]],
      location: [null, [Validators.required]],
      priceId: [null, [Validators.required]],
      agreement: [false, [Validators.requiredTrue]]
    });
  }

  private updateMerchantData(merchantLocations: ILocation[]): any {
    this.merchantAllLocations = this.merchantAllLocations.concat(merchantLocations);
    this.locationData = of(this.merchantAllLocations);
    this.lastMerchantPage++;
    this.isCurrentMerchantPageLoaded = true;
  }

  public submitForm(): void {
    const currentPrice = this.prices.find((price) => price.id === this.bookingForm.value.priceId);
    // allow free rewards to go through
    if (!currentPrice || currentPrice.points === undefined || null) {
      return;
    }
    const totalCost = currentPrice.points * this.bookingForm.value.quantity;
    if (totalCost > this.loyalty.pointsBalance) {
      this.notificationService.addPopup({
        title: 'Sorry',
        text: 'You do not have enough points for this transaction'
      });
      return;
    }

    forkJoin([...new Array(parseInt(this.bookingForm.value.quantity, 10))].map(() =>
      this.vouchersService.reserveReward(this.rewardId,
        {
          priceId: this.bookingForm.value.priceId,
          locationId: this.bookingForm.value.location,
          sourceType: ''
        })
    )).subscribe(() => {
      this.notificationService.addPopup({
        text: 'You can access your voucher from the wallet',
        title: 'Download Successful!',
        buttonTxt: 'Go to Wallet',
        imageUrl: 'assets/congrats_image.png',
        afterClosedCallBack: this
      });
    }, (err) => {
      if (err.code === 40) {
        this.notificationService.addPopup({
          title: 'Sorry',
          text: 'You do not have enough points for this transaction'
        });
      }
    });
  }

  public getMerchantData(): void {
    if (!this.isCurrentMerchantPageLoaded) {
      return;
    }

    this.isCurrentMerchantPageLoaded = false;
    this.locationService.getFromMerchant(this.merchantId, this.lastMerchantPage).subscribe(
      (merchantLocations: ILocation[]) => {
        this.updateMerchantData(merchantLocations);
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

  public dialogClosed(): void {
    this.router.navigateByUrl('wallet');
  }
}
