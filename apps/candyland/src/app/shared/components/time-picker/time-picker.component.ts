import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import {noop, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {customTimepickerTheme} from '@cl-shared/components/time-picker/custom-timepicker-theme';

@Component({
  selector: 'cl-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TimePickerComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TimePickerComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() control: AbstractControl = new FormControl(null, []);
  @Input() placeholder = 'Time';

  @Input() set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  public theme = customTimepickerTheme;
  public disabledState = false;
  private destroy$ = new Subject();
  private onChange: any = noop;
  // @ts-ignore
  private onTouched: any = noop;

  constructor() {
  }

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((value: any) => {
        this.onChange(value);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
    this.control.markAsTouched();
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabledState = isDisabled;
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  public writeValue(obj: DatepickerRangeValue<Date> | null): void {
    if (obj) {
      this.control.patchValue(obj);
    } else {
      this.control.reset();
    }
    this.onChange(obj);
  }
}
