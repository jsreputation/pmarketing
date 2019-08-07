import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DateAdapter } from '@angular/material';

@Component({
  selector: 'cl-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() public control: AbstractControl = new FormControl(null, []);
  @Input() set value(obj) {
    if (obj) {
      const newDate = new Date(obj);
      this.writeValue(newDate);
    }
  }
  @Input() public placeholder = 'Choose date';
  @Input() public max: Date | null = null;
  @Input() public min: Date | null = null;
  public disabledState = false;

  @Input() set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  private destroy$ = new Subject();
  private onChange: any = noop;
  // @ts-ignore
  private onTouched: any = noop;

  constructor(private dateAdapter: DateAdapter<Date>,
              private cd: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.control.valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((value: Date) => {
        this.onChange(value);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get maxDate(): Date | null {
    return this.max ? this.getPreviousDay(this.max) : null;
  }

  public get minDate(): Date | null {
    return this.min ? this.getNextDay(this.min) : null;
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

  public writeValue(obj: Date | null): void {
    if (obj) {
      this.control.patchValue(obj);
    } else {
      this.control.reset();
    }
    this.onChange(obj);
    this.cd.detectChanges();
  }

  private getNextDay(date: Date): Date {
    return this.dateAdapter.addCalendarDays(new Date(date), 1);
  }

  private getPreviousDay(date: Date): Date {
    return this.dateAdapter.addCalendarDays(new Date(date), -1);
  }
}
