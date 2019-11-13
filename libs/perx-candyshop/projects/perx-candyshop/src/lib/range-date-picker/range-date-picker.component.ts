import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cs-range-date-picker-filter',
  templateUrl: './range-date-picker.component.html',
  styleUrls: ['./range-date-picker.component.scss']
})
export class RangeDatePickerComponent {
  @Input() public control: FormControl = new FormControl();
  @Input() public placeholder: string = '';

}
