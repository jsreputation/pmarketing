import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter } from 'saturn-datepicker';
import { noop, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'cl-separate-range-date-picker-filter',
  templateUrl: './separate-range-date-picker-filter.component.html',
  styleUrls: ['./separate-range-date-picker-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SepareteRangeDatePickerFilterComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SepareteRangeDatePickerFilterComponent implements OnInit, OnDestroy, ControlValueAccessor {

  public timeForm: FormGroup;
  public disabledState: boolean;
  private destroy$ = new Subject();

  constructor(private dateAdapter: DateAdapter<Date>) {
    this.timeForm = new FormGroup({
      begin: new FormControl(null, []),
      end: new FormControl(null, [])
    });
  }

  ngOnInit(): void {
    this.timeForm.valueChanges
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((value: DatepickerRangeValue<Date>) => {
        this.onChange(value);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get begin(): AbstractControl {
    return this.timeForm.get('begin');
  }

  public get end(): AbstractControl {
    return this.timeForm.get('end');
  }

  public getNextDay(date: Date): Date {
    return this.dateAdapter.addCalendarDays(new Date(date), 1);
  }

  public getPreviousDay(date: Date): Date {
    return this.dateAdapter.addCalendarDays(new Date(date), -1);
  }

  onChange: any = noop;

  onTouched: any = noop;

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
    this.timeForm.markAsTouched();
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabledState = isDisabled;
  }

  writeValue(obj: DatepickerRangeValue<Date> | null): void {
    if (obj) {
      this.timeForm.patchValue(obj);
    } else {
      this.timeForm.reset();
    }
    this.onChange(obj);
  }
}
