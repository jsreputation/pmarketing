import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cl-range-date-picker-filter',
  templateUrl: './range-date-picker-filter.component.html',
  styleUrls: ['./range-date-picker-filter.component.scss']
})
export class RangeDatePickerFilterComponent {
  @Input() public control = new FormControl();

}
