import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-loyalty-form-step-four',
  templateUrl: './loyalty-form-step-four.component.html',
  styleUrls: ['./loyalty-form-step-four.component.scss']
})
export class LoyaltyFormStepFourComponent implements OnInit {
  @Input() public group: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
