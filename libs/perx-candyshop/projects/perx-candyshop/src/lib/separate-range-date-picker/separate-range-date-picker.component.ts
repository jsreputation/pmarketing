import { ChangeDetectionStrategy, Component, forwardRef, Input, OnDestroy, OnInit } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { DateAdapter } from 'saturn-datepicker';
import { noop, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { DatepickerRangeValue } from '../../models/datepicker-range-value.interface';

@Component({
  selector: 'cs-separate-range-date-picker',
  templateUrl: './separate-range-date-picker.component.html',
  styleUrls: ['./separate-range-date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SepareteRangeDatePickerComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SepareteRangeDatePickerComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() public appearance: string = 'outline';
  @Input() public startPlaceholder: string = 'Start Date';
  @Input() public endPlaceholder: string = 'End Date';
  public timeForm: FormGroup = new FormGroup({
    begin: new FormControl(null, []),
    end: new FormControl(null, [])
  });
  public disabledState: boolean;
  private destroy$: Subject<void> = new Subject();
  private onChange: any = noop;
  // @ts-ignore
  private onTouched: any = noop;

  constructor(private dateAdapter: DateAdapter<Date>) {

  }

  public ngOnInit(): void {
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
    return this.timeForm.get('begin') as AbstractControl;
  }

  public get end(): AbstractControl {
    return this.timeForm.get('end') as AbstractControl;
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
