import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-loyalty-form-step-four',
  templateUrl: './loyalty-form-step-four.component.html',
  styleUrls: ['./loyalty-form-step-four.component.scss']
})
export class LoyaltyFormStepFourComponent {
  @Input() public group: FormGroup;

}
