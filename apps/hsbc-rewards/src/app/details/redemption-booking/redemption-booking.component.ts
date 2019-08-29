import {Component, OnInit} from '@angular/core';
import {
  LocationsService,
  RewardsService,
  ILocation,
  IReward,
  NotificationService,
  PopupComponent,
  LoyaltyService,
  ILoyalty
} from '@perx/core';
import {ActivatedRoute, Router} from '@angular/router';
import {switchMap, map, flatMap} from 'rxjs/operators';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {forkJoin, Observable, of} from 'rxjs';
import {IPrice} from '@perx/core/dist/perx-core/lib/rewards/models/reward.model';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-redemption-booking',
  templateUrl: './redemption-booking.component.html',
  styleUrls: ['./redemption-booking.component.scss']
})
export class RedemptionBookingComponent implements OnInit {
  public rewardId: number;
  public prices: IPrice[];
  public customBackButton: string = 'assets/img/close.svg';
  public locationData: Observable<ILocation[]>;
  public reward: IReward;
  public merchants: IMerchant[] = [];
  public quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  public bookingForm: FormGroup;
  private loyalty: ILoyalty;

  constructor(
    private locationService: LocationsService,
    private rewardsService: RewardsService,
    private loyaltyService: LoyaltyService,
    private route: ActivatedRoute,
    private build: FormBuilder,
    private notificationService: NotificationService,
    private router: Router,
    private dialog: MatDialog
  ) {
  }

  public ngOnInit(): void {
    this.notificationService.$popup.subscribe(data => {
      this.dialog.open(PopupComponent, {data});
    });
    this.getData();
    this.getLoyalty();
    this.buildForm();
  }

  private getData(): void {
    this.route.params.pipe(switchMap((param) => {
      this.rewardId = param.id;
      return forkJoin([this.rewardsService.getReward(this.rewardId),
        this.rewardsService.getRewardPricesOptions(this.rewardId)]);
    })).pipe(flatMap((result) => {
      [this.reward, this.prices] = result;
      const merchantId = this.reward.merchantId;
      // merchantId can be null if reward is set up incorrectly on dashboard
      return this.locationService.getFromMerchant(merchantId);
    })).subscribe(
      (merchantLocations) => {
        this.locationData = of(merchantLocations);
      },
      (err) => {
        // validators will prevent form submission
        this.notificationService.addPopup({
          title: 'Sorry',
          text: 'We\'re unable to perform this transaction at this time'
        });
      }
    );
  }

  public buildForm(): void {
    this.bookingForm = this.build.group({
      quantity: [null, [Validators.required]],
      merchant: [{value: null, disabled: true}, [Validators.required]],
      location: [null, [Validators.required]],
      pointsBalance: [null],
      agreement: [false, [Validators.requiredTrue]]
    });
  }

  public submitForm(): void {
    const totalCost = this.prices.find((price) => price.id === this.bookingForm.value.pointsBalance)
      .points * this.bookingForm.value.quantity;
    if (totalCost > this.loyalty.pointsBalance) {
      this.notificationService.addPopup({
        title: 'Sorry',
        text: 'You do not have enough points for this transaction'
      });
      return;
    }
    this.rewardsService.reserveReward(this.rewardId,
      {priceId: this.bookingForm.value.quantity, locationId: this.bookingForm.value.location})
      .subscribe(() => {
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
    })).subscribe((loyalty) => {
      this.loyalty = loyalty;
    });
  }
}
