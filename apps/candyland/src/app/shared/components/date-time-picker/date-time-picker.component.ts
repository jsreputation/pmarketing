import { ChangeDetectionStrategy, Component, forwardRef, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter } from 'saturn-datepicker';
import { noop, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { NgxMaterialTimepickerTheme } from 'ngx-material-timepicker';

@Component({
  selector: 'cl-date-time-picker',
  templateUrl: './date-time-picker.component.html',
  styleUrls: ['./date-time-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DateTimePickerComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DateTimePickerComponent implements OnInit, OnDestroy, ControlValueAccessor {

  customTheme: NgxMaterialTimepickerTheme = {
    container: {
      bodyBackgroundColor: '#fff',
      buttonColor: '#3b4e77'
    },
    dial: {
      dialBackgroundColor: '#3b4e77',
    },
    clockFace: {
      clockFaceBackgroundColor: '#fff',
      clockHandColor: '#3b4e77',
      clockFaceTimeInactiveColor: '#3b4e77'
    }
  };


  public timeForm: FormGroup;
  public disabledState: boolean;
  private destroy$ = new Subject();
  private onChange: any = noop;
  // @ts-ignore
  private onTouched: any = noop;

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
        console.log('date', value);
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

  public get maxDate(): Date | null {
    return this.end.value ? this.getPreviousDay(this.end.value) : null;
  }

  public get minDate(): Date | null {
    return this.begin.value ? this.getNextDay(this.begin.value) : null;
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
    this.timeForm.markAsTouched();
  }

  public setDisabledState(isDisabled: boolean): void {
    this.disabledState = isDisabled;
  }

  public writeValue(obj: DatepickerRangeValue<Date> | null): void {
    if (obj) {
      this.timeForm.patchValue(obj);
    } else {
      this.timeForm.reset();
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
