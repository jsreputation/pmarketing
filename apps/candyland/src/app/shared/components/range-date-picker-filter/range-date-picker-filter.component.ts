import { Component, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'cl-range-date-picker-filter',
  templateUrl: './range-date-picker-filter.component.html',
  styleUrls: ['./range-date-picker-filter.component.scss']
})
export class RangeDatePickerFilterComponent {
  @Input() public control: FormControl = new FormControl();
  public disabledState: boolean = false;

  @Input() set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabledState = isDisabled;
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }
}
