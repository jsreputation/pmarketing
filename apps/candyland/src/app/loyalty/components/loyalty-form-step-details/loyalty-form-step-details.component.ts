import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-loyalty-form-step-details',
  templateUrl: './loyalty-form-step-details.component.html',
  styleUrls: ['./loyalty-form-step-details.component.scss']
})
export class LoyaltyFormStepDetailsComponent implements OnInit {
  @Input() public group: FormGroup;
  @Input() public config: any;

  public ngOnInit(): void {
  }

}
