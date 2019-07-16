import {ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';
import {DateAdapter} from 'saturn-datepicker';
import {noop, Subject} from 'rxjs';
import {takeUntil} from 'rxjs/operators';

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
  @Input() control: FormControl = new FormControl(null, []);
  @Input() placeholder = 'Choose date';
  @Input() max: Date | null = null;
  @Input() min: Date | null = null;

  @Input() set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  private destroy$ = new Subject();
  private onChange: any = noop;
  // @ts-ignore
  private onTouched: any = noop;

  constructor(private dateAdapter: DateAdapter<Date>) {
  }

  ngOnInit(): void {
    this.control.valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((value: Date) => {
        console.log('date', value);
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

  private getNextDay(date: Date): Date {
    return this.dateAdapter.addCalendarDays(new Date(date), 1);
  }

  private getPreviousDay(date: Date): Date {
    return this.dateAdapter.addCalendarDays(new Date(date), -1);
  }
}
