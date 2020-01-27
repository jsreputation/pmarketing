import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component,
  Host,
  Input,
  OnDestroy,
  OnInit, Optional, Self, ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import {noop, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import { NgxMaterialTimepickerComponent, NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';
import { customTimepickerTheme } from './custom-timepicker-theme';
import { DatepickerRangeValue } from '../../models/datepicker-range-value.interface';
import { MatFormField, MatFormFieldControl } from '@angular/material';
import { CsFormFieldControl } from '../form-field-control';

@Component({
  selector: 'cs-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: TimePickerComponent
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TimePickerComponent extends CsFormFieldControl<any> implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() public clickable: boolean = true;
  @Input() public format: number = 24;
  public timePickerControl: AbstractControl = new FormControl(null, []);
  public theme: NgxMaterialTimepickerTheme = customTimepickerTheme;
  @ViewChild('timePicker', {static: false}) public timePicker: NgxMaterialTimepickerComponent;

  private onChange: any = noop;
  private onTouched: any = noop;
  private destroy$: Subject<void> = new Subject();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    @Optional() @Host() protected formField: MatFormField,
    private cd: ChangeDetectorRef,
  ) {
    super('cs-time-picker', ngControl);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public ngOnInit(): void {
    this.timePickerControl.valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((value: any) => {
        this.value = value;
        this.onChange(value);
        this.onTouched();
      });
  }

  public ngOnDestroy(): void {
    this.stateChanges.complete();
    this.destroy$.next();
    this.destroy$.complete();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
    this.timePickerControl.markAsTouched();
  }

  public writeValue(obj: DatepickerRangeValue<Date> | null): void {
    if (obj) {
      this.timePickerControl.patchValue(obj, {emitEvent: false});
    } else {
      this.timePickerControl.reset();
    }
  }

  public open(): void {
    if (this.timePicker) {
      this.timePicker.open();
      this.cd.markForCheck();
    }
  }

  public onContainerClick = (): void => {
    if (this.clickable) {
      this.open();
    }
  };

  public onClickInnerInput(): void {
    if (!this.formField && this.clickable) {
      this.open();
    }
  }
}
