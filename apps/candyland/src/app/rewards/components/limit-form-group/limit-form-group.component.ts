import {Component, Input} from '@angular/core';
import {AbstractControl} from '@angular/forms';

@Component({
  selector: 'cl-limit-form-group',
  templateUrl: './limit-form-group.component.html',
  styleUrls: ['./limit-form-group.component.scss']
})
export class LimitFormGroupComponent  {
  @Input() public formGroup: AbstractControl;
  @Input() public config: any;

}
