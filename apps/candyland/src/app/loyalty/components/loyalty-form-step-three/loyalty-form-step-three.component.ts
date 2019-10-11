import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-loyalty-form-step-three',
  templateUrl: './loyalty-form-step-three.component.html',
  styleUrls: ['./loyalty-form-step-three.component.scss']
})
export class LoyaltyFormStepThreeComponent {
  @Input() public group: FormGroup;

}
