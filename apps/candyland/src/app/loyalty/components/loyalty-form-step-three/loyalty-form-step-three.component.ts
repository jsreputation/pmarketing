import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-loyalty-form-step-three',
  templateUrl: './loyalty-form-step-three.component.html',
  styleUrls: ['./loyalty-form-step-three.component.scss']
})
export class LoyaltyFormStepThreeComponent implements OnInit {
  @Input() public group: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
