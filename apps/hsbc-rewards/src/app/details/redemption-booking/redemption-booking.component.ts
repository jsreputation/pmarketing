import { Component, OnInit } from '@angular/core';
import { LocationsService, RewardsService, ILocation, IReward } from '@perx/core';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DynamicCreateService } from 'src/app/shared/service/dynamic-create.service';
import { DetailAgreementComponent } from '../detail-agreement/detail-agreement.component';
import { MerchantService } from 'src/app/shared/service/merchant.service';

@Component({
  selector: 'app-redemption-booking',
  templateUrl: './redemption-booking.component.html',
  styleUrls: ['./redemption-booking.component.scss']
})
export class RedemptionBookingComponent implements OnInit {
  public customBackButton: string = 'assets/img/close.svg';
  public locationData: ILocation[];
  public reward: IReward;
  public merchants: IMerchant[] = [];
  public quantityes: number[] = [];
  public bookingForm: FormGroup;
  constructor(
    private locationService: LocationsService,
    private rewardsService: RewardsService,
    private route: ActivatedRoute,
    private build: FormBuilder,
    private compCreate: DynamicCreateService,
    private router: Router,
    private merchantService: MerchantService,
  ) { }

  public ngOnInit(): void {
    this.rewardsService.getRewardPricesOptions(149).subscribe((val)=>{

    })
    this.route.params.pipe(switchMap((param) => {
      return this.rewardsService.getReward(param.id);
    })).subscribe((reward) => {
      this.reward = reward;
    });
    this.locationService.getFromMerchant(1).subscribe((result) => {
      this.locationData = result;
    });
    this.merchantService.getMerchants().subscribe((res) => {
      this.merchants = res;
    });
    this.buildForm();
  }
  public buildForm(): void {
    this.bookingForm = this.build.group({
      quantity: [null, [Validators.required]],
      merchant: [null, [Validators.required]],
      location: [null],
      pointsBalance: [null],
      agreement: [false, [Validators.requiredTrue]]
    });
  }
  public openAgreement(): void {
    const comp = this.compCreate.createComponent<DetailAgreementComponent>(DetailAgreementComponent);
    comp.instance.closeModal.subscribe(() => this.compCreate.removeComponent(comp));
  }
  public submitForm(): void {
    this.router.navigate(['detail/success']);
  }
}
