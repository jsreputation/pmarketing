import { distinctUntilChanged, takeUntil } from 'rxjs/operators';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges
} from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop, Subject } from 'rxjs';

@Component({
  selector: 'cl-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent),
      multi: true
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatePickerComponent implements OnInit, OnChanges, OnDestroy, ControlValueAccessor {
  @Input() public control: AbstractControl = new FormControl(null, []);

  @Input() set value(obj: string) {
    if (obj) {
      const newDate = new Date(obj);
      this.writeValue(newDate);
    }
  }

  @Input() public placeholder: string = 'Choose date';
  @Input() public max: Date | null = null;
  @Input() public min: Date | null = null;
  public disabledState: boolean = false;

  @Input() set disabled(value: boolean) {
    this.setDisabledState(value);
  }

  private onChange: any = noop;
  // @ts-ignore
  private onTouched: any = noop;
  private destroy$: Subject<any> = new Subject();

  constructor(private cd: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.control.valueChanges
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
      )
      .subscribe((value: Date) => {
        this.onChange(value);
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.max && changes.max.currentValue && (changes.max.currentValue !== changes.max.previousValue)) {
      this.max = changes.max.currentValue;
    }
    if (changes && changes.min && changes.min.currentValue && (changes.min.currentValue !== changes.min.previousValue)) {
      this.min = changes.min.currentValue;
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
    this.cd.detach();
  }

  public minMaxFilter(d: Date): boolean {
    const current = d.getTime();
    const from = this.min ? this.min.getTime() : null;
    const to = this.max ? this.max.getTime() : null;
    return !((!!from && (current < from)) || (!!to && (current > to)));
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
    this.onTouched = fn;
    this.control.markAsTouched();
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
