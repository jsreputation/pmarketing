import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'cl-limit-form-group',
  templateUrl: './limit-form-group.component.html',
  styleUrls: ['./limit-form-group.component.scss']
})
export class LimitFormGroupComponent implements OnInit {
  @Input() public formGroup: AbstractControl;
  @Input() public config: any;

  constructor() {
  }

  public ngOnInit() {
  }

}
