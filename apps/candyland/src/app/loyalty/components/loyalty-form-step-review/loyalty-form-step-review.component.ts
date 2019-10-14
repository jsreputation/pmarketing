import { Component, Input } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-loyalty-form-step-review',
  templateUrl: './loyalty-form-step-review.component.html',
  styleUrls: ['./loyalty-form-step-review.component.scss']
})
export class LoyaltyFormStepReviewComponent {
  @Input() public group: FormGroup;

  public get formValue(): AbstractControl {
    return this.group.value;
  }
}
