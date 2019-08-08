import { Component, OnInit } from '@angular/core';
import { LocationsService, RewardsService, ILocation, IReward } from '@perx/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { DinamicCreateService } from 'src/app/shared/service/dinamic-create.service';
import { DetailAgreementComponent } from '../detail-agreement/detail-agreement.component';

@Component({
  selector: 'app-redemption-booking',
  templateUrl: './redemption-booking.component.html',
  styleUrls: ['./redemption-booking.component.scss']
})
export class RedemptionBookingComponent implements OnInit {
  public customBackButton = 'assets/img/close.svg';
  public locationData:ILocation[];
  public reward:IReward;
  public merchants = [];
  public quantityes = [];
  public bookingForm : FormGroup;
  constructor(
    private locationService: LocationsService,
    private rewardsService: RewardsService,
    private route: ActivatedRoute,
    private build: FormBuilder,
    private compCreate: DinamicCreateService
  ) { }

  public ngOnInit() {
    this.route.params.pipe(switchMap((param)=>{
     return this.rewardsService.getReward(param.id);
    })).subscribe((reward)=>{
      this.reward = reward;
    })
    this.locationService.getFromMerchant(1).subscribe((result)=>{
      this.locationData = result;
    });
    this.buildForm();
  }
  public buildForm() {
    this.bookingForm = this.build.group({
      quantity: [null], 
      merchant: [null], 
      location: [null], 
      pointsBalance: [null], 
      aggriement: [false, [Validators.requiredTrue]]
    });
  }
  public openAgreement() {
    const comp = this.compCreate.createComponent<DetailAgreementComponent>(DetailAgreementComponent);
    comp.instance.close.subscribe(()=>this.compCreate.removeComponent(comp));
  }
  public submitForm() {
    
  }
}
