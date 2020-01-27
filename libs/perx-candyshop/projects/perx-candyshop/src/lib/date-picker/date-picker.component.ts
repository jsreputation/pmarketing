import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import {
  ChangeDetectionStrategy, ChangeDetectorRef,
  Component, Host,
  Input,
  OnDestroy,
  OnInit, Optional, Self,
  ViewChild
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { noop, Subject } from 'rxjs';
import { CsFormFieldControl } from '../form-field-control';
import { MatDatepicker, MatFormFieldControl, DateAdapter, MatFormField } from '@angular/material';
import Utils from '../../utils';

@Component({
  selector: 'cs-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: DatePickerComponent
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePickerComponent extends CsFormFieldControl<any> implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() public minDayPeriod: number = 1;
  @Input() public set min(value: Date | null) {
    this.minDate = value ? this.getNextDay(value) : null;
  }
  @Input() public set max(value: Date | null) {
    this.maxDate = value ? this.getPreviousDay(value) : null;
  }
  @Input() public clickable: boolean = true;
  public datePickerControl: AbstractControl = new FormControl(null, []);
  public minDate: Date | null = null;
  public maxDate: Date | null = null;
  //
  // @Input() set value(obj: string) {
  //   if (obj) {
  //     const newDate = new Date(obj);
  //     this.writeValue(newDate);
  //   }
  // }

  @ViewChild('datePicker', {static: false}) public datePicker: MatDatepicker<Date>;

  private onChange: any = noop;
  private onTouched: any = noop;
  private destroy$: Subject<void> = new Subject();

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    @Optional() @Host() protected formField: MatFormField,
    private cd: ChangeDetectorRef,
    private dateAdapter: DateAdapter<Date>
  ) {
    super('cs-date-picker', ngControl);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
  }

  public ngOnInit(): void {
    this.datePickerControl.valueChanges
      .pipe(
        distinctUntilChanged(Utils.isEqual),
        takeUntil(this.destroy$)
      )
      .subscribe((value: Date) => {
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

  public minMaxFilter(d: Date): boolean {
    const from = this.min;
    const to = this.max;
    return !((!!from && (d < from)) || (!!to && (d > to)));
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
    this.datePickerControl.markAsTouched();
  }

  public writeValue(obj: Date | null): void {
    if (obj) {
      this.datePickerControl.patchValue(obj, {emitEvent: false});
    } else {
      this.datePickerControl.reset();
    }
  }

  public open(): void {
    if (this.datePicker) {
      this.datePicker.open();
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

  private getNextDay(date: Date): Date {
    return this.dateAdapter.addCalendarDays(new Date(date), this.minDayPeriod);
  }

  private getPreviousDay(date: Date): Date {
    return this.dateAdapter.addCalendarDays(new Date(date), -this.minDayPeriod);
  }
}
