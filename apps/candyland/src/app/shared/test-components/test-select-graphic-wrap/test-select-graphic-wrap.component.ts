import { Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'cl-select-graphic-wrap',
  templateUrl: './test-select-graphic-wrap.component.html',
  styleUrls: ['./test-select-graphic-wrap.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TestSelectGraphicWrapComponent),
      multi: true
    }
  ]
})
export class TestSelectGraphicWrapComponent implements ControlValueAccessor {
  @Input() public placeholder: string = '';
  @Input() public btnLabel: string = '';
  @Input() public classList: string = '';
  @Input() public isRequired: boolean;

  @Input()
  public set selectGraphic(value: any) {
    this.setGraphic = value;
  }
  public setGraphic: any;
  public lock: any;

  public onChange: any = () => {
  }
  public onTouched: any = () => {
  }
  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public setDisabledState(isDisabled: boolean): void {
    this.lock = isDisabled;
  }

  public writeValue(obj: any): void {
    this.setGraphic = obj;
  }
}
