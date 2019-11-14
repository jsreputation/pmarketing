import {
  Component,
  OnInit,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';

import { map } from 'rxjs/operators';

import {
  ProfileService,
  NotificationService,
  LoyaltyService,
  isEmptyArray,
} from '@perx/core';

@Component({
  selector: 'app-existing-card',
  templateUrl: './existing-card.component.html',
  styleUrls: ['./existing-card.component.scss']
})
export class ExistingCardComponent implements OnInit {
  public existingCardForm: FormGroup;

  private loyaltyId: number = null;

  constructor(
    private fb: FormBuilder,
    private loyaltyService: LoyaltyService,
    private profileService: ProfileService,
    private notificationService: NotificationService,
  ) { }

  public ngOnInit(): void {
    this.initForm();
    this.initLoyaltyId();
  }

  private initForm(): void {
    this.existingCardForm = this.fb.group({
      cardNumber: ['', Validators.required]
    });
  }

  private initLoyaltyId(): void {
    this.loyaltyService.getLoyalties().pipe(
      map(loyalties => !isEmptyArray(loyalties) && loyalties[0])
    ).subscribe( (loyalty) => {
      this.loyaltyId = loyalty.id;
    });
  }

  public onSubmit(): void {
    const cardNumber: number = (this.existingCardForm.get('cardNumber').value as number);
    const cardNumberData = {
      cardNumber,
      loyaltyProgramId: this.loyaltyId,
    };

    try {
      this.profileService.setCardNumber(cardNumberData).subscribe(
        () => {
          // this.router.navigate(['enter-pin'], { state: { mobileNumber } });
        },
        err => {
          if (err instanceof HttpErrorResponse) {
            if (err.status === 0) {
              this.notificationService.addSnack('We could not reach the server');
            } else if (err.status === 401) {
              this.notificationService.addSnack('Invalid card number.');
            } else if (err.status === 404) {
              this.notificationService.addSnack('Card number not found.');
            } else {
              this.notificationService.addSnack(err.statusText);
            }
          }
        });
    } catch (error) {
      console.log(error);
    }
  }
}
