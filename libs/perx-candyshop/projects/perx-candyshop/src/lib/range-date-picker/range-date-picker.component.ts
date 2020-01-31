import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { noop, Subject } from 'rxjs';

@Component({
  selector: 'cs-range-date-picker',
  templateUrl: './range-date-picker.component.html',
  styleUrls: ['./range-date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RangeDatePickerComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RangeDatePickerComponent implements OnInit, OnDestroy, ControlValueAccessor {
  @Input() public control: FormControl = new FormControl();
  @Input() public placeholder: string = 'Choose a date';
  @Input() public appearance: string = '';

  @Input() public set value(obj: string) {
    if (obj) {
      const newDate = new Date(obj);
      this.writeValue(newDate);
    }
  }

  public disabledState: boolean = false;

  @Input() public set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  private onChange: any = noop;
  // @ts-ignore
  private onTouched: any = noop;
  private destroy$: Subject<void> = new Subject();

  constructor(private cd: ChangeDetectorRef) { }

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
    this.cd.detach();
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

}
