import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component, Host,
  Input,
  OnDestroy,
  OnInit, Optional, Self, ViewChild
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import { noop, Subject } from 'rxjs';
import { CsFormFieldControl } from '../form-field-control';
import { MatDatepicker, MatFormField, MatFormFieldControl } from '@angular/material';
import Utils from '../../utils';

@Component({
  selector: 'cs-range-date-picker',
  templateUrl: './range-date-picker.component.html',
  styleUrls: ['./range-date-picker.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: RangeDatePickerComponent
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RangeDatePickerComponent extends CsFormFieldControl<any> implements OnInit, OnDestroy, ControlValueAccessor {
  // @Input() public control: FormControl = new FormControl();
  public datePickerControl: AbstractControl = new FormControl(null, []);
  // @Input() public placeholder: string = 'Choose a date';
  // @Input() public appearance: string = '';

  // @Input() set value(obj: string) {
  //   if (obj) {
  //     const newDate = new Date(obj);
  //     this.writeValue(newDate);
  //   }
  // }

  // public disabledState: boolean = false;

  // @Input() set disabled(value: boolean) {
  //   this.setDisabledState(value);
  // }
  @ViewChild('datePicker', { static: false }) public datePicker: MatDatepicker<Date>;
  @Input() public clickable: boolean = true;
  @Input() public minDayPeriod: number = 1;

  private onChange: any = noop;
  private onTouched: any = noop;
  private destroy$: Subject<void> = new Subject();

  constructor(@Optional() @Self() public ngControl: NgControl,
    @Optional() @Host() protected formField: MatFormField,
    private cd: ChangeDetectorRef) {
    super('cs-range-date-picker', ngControl);
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
    this.cd.detach();
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
    this.datePickerControl.markAsTouched();
  }

  // public setDisabledState(isDisabled: boolean): void {
  //   this.disabledState = isDisabled;
  //   if (isDisabled) {
  //     this.control.disable();
  //   } else {
  //     this.control.enable();
  //   }
  // }

  public writeValue(obj: Date | null): void {
    if (obj) {
      this.datePickerControl.patchValue(obj, { emitEvent: false });
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
  }

  public onClickInnerInput(): void {
    if (!this.formField && this.clickable) {
      this.open();
    }
  }
}
