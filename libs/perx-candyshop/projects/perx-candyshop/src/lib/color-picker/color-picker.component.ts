import {
  ChangeDetectorRef,
  Component,
  Host,
  Input,
  OnDestroy, OnInit,
  Optional,
  Self,
  ViewChild,
  ViewEncapsulation
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { MatFormField, MatFormFieldControl } from '@angular/material/form-field';
import { ColorPickerDirective } from 'ngx-color-picker';
import { CsFormFieldControl } from '../form-field-control';

@Component({
  selector: 'cs-color-picker',
  templateUrl: './color-picker.component.html',
  styleUrls: ['./color-picker.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: ColorPickerComponent
    }
  ],
  encapsulation: ViewEncapsulation.None
})
export class ColorPickerComponent extends CsFormFieldControl<string> implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() public formatData: string = 'hex';
  @Input() public clickable: boolean = true;
  @Input() public defaultValue: string = '#2883e9';
  @Input() public classList: string = '';
  @Input('aria-label') public ariaLabel: string = '';
  @ViewChild('colorPicker', { static: false }) public colorPicker: ColorPickerDirective;
  public toggle: boolean = false;

  public onChange: any = () => {
  }

  public onTouch: any = () => {
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    @Optional() @Host() protected formField: MatFormField,
    private cd: ChangeDetectorRef
  ) {
    super('cs-color-picker', ngControl);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public ngOnInit(): void {
    if (!this.value) {
      this.value = this.defaultValue;
    }
  }

  public ngOnDestroy(): void {
    this.stateChanges.complete();
    this.cd.detach();
  }

  public onEventLog(value: string): void {
    if (this.disabled) {
      return;
    }
    this.onChange(value);
    this.value = value;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  public writeValue(value: string | null): void {
    if (value) {
      this.onChange(value);
      this.value = value;
    } else {
      this.onChange(this.defaultValue);
      this.value = this.defaultValue;
    }
  }

  public open(): void {
    if (this.colorPicker && !this.disabled) {
      this.toggle = !this.toggle;
      this.cd.markForCheck();
    }
  }

  public onContainerClick = (): void => {
    if (this.clickable) {
      this.open();
    }
  }

  public onClickInnerInput(): void {
    if (!this.formField && this.clickable) {
      this.open();
    }
  }
}
