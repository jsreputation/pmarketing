import { Component, OnInit } from '@angular/core';
import { LocationsService, RewardsService } from '@perx/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-redemption-booking',
  templateUrl: './redemption-booking.component.html',
  styleUrls: ['./redemption-booking.component.scss']
})
export class RedemptionBookingComponent implements OnInit {
  customBackButton = 'assets/img/close.svg';
  locationData;
  reward;
  merchants = [];
  quantityes = [];
  bookingForm : FormGroup;
  constructor(
    private locationService: LocationsService,
    private rewardsService: RewardsService,
    private route: ActivatedRoute,
    private build: FormBuilder
  ) { }

  ngOnInit() {
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
  buildForm() {
    this.bookingForm = this.build.group({
      quantity: [null], 
      merchant: [null], 
      location: [null], 
      pointsBalance: [null], 
      aggriement: [false, [Validators.requiredTrue]]
    });
  }

  submitForm() {
    
  }
}
