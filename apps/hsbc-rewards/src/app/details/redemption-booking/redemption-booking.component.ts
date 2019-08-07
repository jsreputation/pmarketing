import { Component, OnInit } from '@angular/core';
import { LocationsService } from '@perx/core';

@Component({
  selector: 'app-redemption-booking',
  templateUrl: './redemption-booking.component.html',
  styleUrls: ['./redemption-booking.component.scss']
})
export class RedemptionBookingComponent implements OnInit {
  customBackButton = 'assets/img/close.svg'
  constructor(
    private locationService: LocationsService
  ) { }

  ngOnInit() {
    this.locationService.getFromMerchant(1).subscribe((val)=>{
      console.log(val);
    });
  }

}
