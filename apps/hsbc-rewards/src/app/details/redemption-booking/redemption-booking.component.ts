import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  LocationsService,
  RewardsService,
  ILocation,
  IReward,
  NotificationService,
  PopupComponent,
  LoyaltyService,
  ILoyalty,
  IPrice,
  IVoucherService
} from '@perx/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, flatMap, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forkJoin, Observable, of, SubscriptionLike, throwError } from 'rxjs';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-redemption-booking',
  templateUrl: './redemption-booking.component.html',
  styleUrls: ['./redemption-booking.component.scss']
})
export class RedemptionBookingComponent implements OnInit, OnDestroy {
  public rewardId: number;
  public prices: IPrice[];
  public customBackButton: string = 'assets/img/close.svg';
  public locationData: Observable<ILocation[]>;
  public reward: IReward;
  public merchants: IMerchant[] = [];
  public quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public bookingForm: FormGroup;
  private loyalty: ILoyalty;
  private popupSubscription: SubscriptionLike;
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
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  public ngOnInit(): void {
    this.popupSubscription = this.notificationService.$popup.subscribe(data => {
      this.dialog.open(PopupComponent, { data });
    });
    this.getData();
    this.getLoyalty();
    this.buildForm();
  }

  public ngOnDestroy(): void {
    this.popupSubscription.unsubscribe();
  }

  private getData(): void {
    this.route.params.pipe(switchMap((param) => {
      this.rewardId = param.id;
      return forkJoin([this.rewardsService.getReward(this.rewardId),
      this.rewardsService.getRewardPricesOptions(this.rewardId)]);
    })).pipe(flatMap((result) => {
      [this.reward, this.prices] = result;
      if (!this.reward.merchantId) {
        return throwError({ message: 'merchantId is required' });
      }
      this.merchantId = this.reward.merchantId;
      // merchantId can be null if reward is set up incorrectly on dashboard
      return this.locationService.getFromMerchant(this.merchantId);
    })).subscribe(
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

  private updateMerchantData(merchantLocations: ILocation[]): any {
    this.merchantAllLocations = this.merchantAllLocations.concat(merchantLocations);
    this.locationData = of(this.merchantAllLocations);
    this.lastMerchantPage++;
    this.isCurrentMerchantPageLoaded = true;
  }

  public buildForm(): void {
    this.bookingForm = this.build.group({
      quantity: [null, [Validators.required]],
      merchant: [{ value: null, disabled: true }, [Validators.required]],
      location: [null, [Validators.required]],
      priceId: [null, [Validators.required]],
      agreement: [false, [Validators.requiredTrue]]
    });
  }

  public submitForm(): void {
    const currentPrice = this.prices.find((price) => price.id === this.bookingForm.value.priceId);
    if (!currentPrice || !currentPrice.points) {
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

    forkJoin([...new Array(parseInt(this.bookingForm.value.quantity, 10))].map(() => {
      return this.vouchersService.reserveReward(this.rewardId,
        {
          priceId: this.bookingForm.value.priceId,
          locationId: this.bookingForm.value.location,
          sourceType: 'hsbc-rewards'
        });
    })).subscribe(() => {
      this.router.navigate(['detail/success']);
    }, (err) => {
      if (err.code === 40) {
        this.notificationService.addPopup({
          title: 'Sorry',
          text: 'You do not have enough points for this transaction'
        });
      }
    });
  }

  private getLoyalty(): void {
    this.loyaltyService.getLoyalties().pipe(switchMap((loyaltyes) => {
      return !loyaltyes || !loyaltyes.length ? of(null) : this.loyaltyService.getLoyalty(loyaltyes[0].id);
    }), map((loyalty) => {
      if (loyalty) {
        return loyalty;
      }
      throw new Error();
    })).subscribe((loyalty) => {
      this.loyalty = loyalty;
    }, () => console.error('Can\'t find loyalty'));
  }
}
