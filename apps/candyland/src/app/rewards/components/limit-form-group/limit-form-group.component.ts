import {Component, Input, OnInit} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'cl-limit-form-group',
  templateUrl: './limit-form-group.component.html',
  styleUrls: ['./limit-form-group.component.scss']
})
export class LimitFormGroupComponent implements OnInit {
  @Input() formGroup: AbstractControl;
  @Input() config: any;

  constructor() {
  }

  ngOnInit() {
  }

}
