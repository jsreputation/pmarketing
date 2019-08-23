import { Component, OnInit } from '@angular/core';
import { LocationsService, RewardsService, ILocation, IReward, NotificationService, PopupComponent } from '@perx/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { IPrice } from '@perx/core/dist/perx-core/lib/rewards/models/reward.model';
import { MatDialog } from '@angular/material';

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

  constructor(
    private locationService: LocationsService,
    private rewardsService: RewardsService,
    private route: ActivatedRoute,
    private build: FormBuilder,
    private notificationService: NotificationService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.notificationService.$popup.subscribe(data => {
      this.dialog.open(PopupComponent, { data });
    });
    this.getData();
    this.buildForm();
  }

  private getData(): void {
    this.route.params.pipe(switchMap((param) => {
      this.rewardId = param.id;
      return forkJoin([this.rewardsService.getReward(this.rewardId),
      this.rewardsService.getRewardPricesOptions(this.rewardId)]);
    })).subscribe((result) => {
      [this.reward, this.prices] = result;
    });
    this.locationData = this.locationService.getAll();
  }
  
  public buildForm(): void {
    this.bookingForm = this.build.group({
      quantity: [null, [Validators.required]],
      merchant: [{ value: null, disabled: true }, [Validators.required]],
      location: [null],
      pointsBalance: [null],
      agreement: [false, [Validators.requiredTrue]]
    });
  }

  public submitForm(): void {
    this.rewardsService.reserveReward(this.rewardId, { priceId: this.bookingForm.value.quantity, locationId: this.bookingForm.value.location }).subscribe((val) => {
      this.router.navigate(['detail/success']);
    }, (err) => {
      if (err.code === 40) {
        this.notificationService.addPopup({
          title: "Sorry",
          text: "You do not have enough points for this transaction"
        })
      }
    })
  }
}
