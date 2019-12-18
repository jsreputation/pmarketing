import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { DateTimeParser } from '@cl-helpers/date-time-parser';

@Component({
  selector: 'cl-date-condition-group',
  templateUrl: './date-condition-group.component.html',
  styleUrls: ['./date-condition-group.component.scss']
})
export class DateConditionGroupComponent {
  @Input() public group: FormGroup;
  @Input() public config: any;

  public get minDate(): Date {
    return (this.config && 'fromDate' in this.config && this.config.fromDate) ? this.config.fromDate : DateTimeParser.getNextDay();
  }
}
