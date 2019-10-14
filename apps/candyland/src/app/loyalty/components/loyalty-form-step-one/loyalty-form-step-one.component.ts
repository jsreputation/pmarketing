import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-loyalty-form-step-one',
  templateUrl: './loyalty-form-step-one.component.html',
  styleUrls: ['./loyalty-form-step-one.component.scss']
})
export class LoyaltyFormStepOneComponent implements OnInit {
  @Input() public group: FormGroup;

  public ngOnInit(): void {
  }

}
