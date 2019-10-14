import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-loyalty-form-step-tiers-conversions',
  templateUrl: './loyalty-form-step-tiers-conversions.component.html',
  styleUrls: ['./loyalty-form-step-tiers-conversions.component.scss']
})
export class LoyaltyFormStepTiersConversionsComponent implements OnInit {
  @Input() public group: FormGroup;

  public ngOnInit(): void {
  }

}
