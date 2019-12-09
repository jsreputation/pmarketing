import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'perx-blackcomb-pages-redemption-booking',
  templateUrl: './redemption-booking.component.html',
  styleUrls: ['./redemption-booking.component.scss']
})
export class RedemptionBookingComponent implements OnInit {

  public bookingForm: FormGroup;

  public quantities: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  constructor(
    private build: FormBuilder
  ) {}

  public ngOnInit(): void {
    this.bookingForm = this.build.group({
      quantity: [null, [Validators.required]],
      location: [null, [Validators.required]],
      priceId: [null, [Validators.required]],
      agreement: [false, [Validators.requiredTrue]]
    });  
  }

  public submitForm(): void {
    console.log('Submit form clicked');
  }

  public getMerchantData(): void {
    console.log('getMerchantData called');
  }
}
