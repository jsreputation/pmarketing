import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-loyalty-form-step-two',
  templateUrl: './loyalty-form-step-two.component.html',
  styleUrls: ['./loyalty-form-step-two.component.scss']
})
export class LoyaltyFormStepTwoComponent implements OnInit {
  @Input() public group: FormGroup;
  constructor() { }

  public ngOnInit(): void {
    console.log('step two');
  }

}
