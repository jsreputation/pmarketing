import { Component, OnInit } from '@angular/core';
import { LocationsService, RewardsService, ILocation, IReward } from '@perx/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { forkJoin, Observable } from 'rxjs';
import { IPrice } from '@perx/core/dist/perx-core/lib/rewards/models/reward.model';

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
  public quantityes: number[] = [];
  public bookingForm: FormGroup;
  constructor(
    private locationService: LocationsService,
    private rewardsService: RewardsService,
    private route: ActivatedRoute,
    private build: FormBuilder,
    private router: Router,
  ) { }

  public ngOnInit(): void {
    this.route.params.pipe(switchMap((param) => {
      this.rewardId = param.id;
      return forkJoin([this.rewardsService.getReward(this.rewardId),
      this.rewardsService.getRewardPricesOptions(this.rewardId)]);
    })).subscribe((result) => {
      [this.reward, this.prices] = result;
    });
    this.locationData = this.locationService.getAll();
    this.buildForm();
  }
  public buildForm(): void {
    this.bookingForm = this.build.group({
      quantity: [null, [Validators.required]],
      merchant: [{value: null, disabled: true}, [Validators.required]],
      location: [null],
      pointsBalance: [null],
      agreement: [false, [Validators.requiredTrue]]
    });
  }

  public submitForm(): void {
    this.router.navigate(['detail/success']);
  }
}
