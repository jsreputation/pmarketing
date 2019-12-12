import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-date-condition-group',
  templateUrl: './date-condition-group.component.html',
  styleUrls: ['./date-condition-group.component.scss']
})
export class DateConditionGroupComponent {
  @Input() public group: FormGroup;
  @Input() public config: any;
}
