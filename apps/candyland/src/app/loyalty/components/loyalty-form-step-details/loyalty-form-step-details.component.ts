import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { IPools } from '@cl-core/models/audiences/audiences';

@Component({
  selector: 'cl-loyalty-form-step-details',
  templateUrl: './loyalty-form-step-details.component.html',
  styleUrls: ['./loyalty-form-step-details.component.scss']
})
export class LoyaltyFormStepDetailsComponent {
  @Input() public group: FormGroup;
  @Input() public pools: IPools;
}
