import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'cl-color-picker',
  templateUrl: './cl-color-picker.component.html',
  styleUrls: ['./cl-color-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ClColorPickerComponent),
      multi: true
    }
  ]
})
export class ClColorPickerComponent implements ControlValueAccessor {
  @Input() public formatData = 'hex';
  public color = '#2883e9';
  public disable: boolean;
  public onChange: any = () => {
  }

  public onTouch: any = () => {
  }
  constructor() {
  }

  public onEventLog(data: any): void {
    if (this.disable) {
      return;
    }
    this.onChange(data);
    this.color = data;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disable = isDisabled;
  }

  public writeValue(obj: any): void {
    this.color = obj;
  }

}
