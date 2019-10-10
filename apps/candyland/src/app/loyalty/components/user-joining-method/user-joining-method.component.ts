import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-user-joining-method',
  templateUrl: './user-joining-method.component.html',
  styleUrls: ['./user-joining-method.component.scss']
})
export class UserJoiningMethodComponent implements OnInit {
  @Input() public group: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
