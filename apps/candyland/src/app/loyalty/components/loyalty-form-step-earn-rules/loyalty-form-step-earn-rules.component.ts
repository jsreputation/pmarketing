import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-loyalty-form-step-earn-rules',
  templateUrl: './loyalty-form-step-earn-rules.component.html',
  styleUrls: ['./loyalty-form-step-earn-rules.component.scss']
})
export class LoyaltyFormStepEarnRulesComponent {
  @Input() public group: FormGroup;

}
