import {
  Component,
  ContentChildren,
  QueryList,
  Input,
  forwardRef,
  ChangeDetectionStrategy,
  OnDestroy, ChangeDetectorRef, AfterViewInit, OnInit
} from '@angular/core';
import { MatCheckbox } from '@angular/material';
import { merge, noop, Subject } from 'rxjs';
import { distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'cl-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CheckboxGroupComponent implements OnInit, AfterViewInit, OnDestroy, ControlValueAccessor {
  @ContentChildren(MatCheckbox) public checkboxList: QueryList<MatCheckbox>;

  @Input() set value(setValue: string[]) {
    this.writeValue(setValue);
  }

  private data: string[] = [];
  private destroy$ = new Subject();
  private onChange: any = noop;
  // @ts-ignore
  private onTouched: any = noop;

  constructor(private cd: ChangeDetectorRef) {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.handlCheckboxList();
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
  }

  public setDisabledState(isDisabled: boolean): void {
    this.toggleDisableCheckboxList(isDisabled);
  }

  public writeValue(arr: string[] | null): void {
    this.data = arr;
    setTimeout(() => {
      this.updateCheckboxList();
    }, 0);
  }

  private handlCheckboxList() {
    merge(...this.checkboxList.map(value => value.change))
      .pipe(
        takeUntil(this.destroy$),
        distinctUntilChanged(),
        map((data: any) => ({checked: data.checked, value: data.source.value})),
        tap((data: any) => {
          if (data.checked) {
            this.data.push(data.value);
          } else {
            this.data = this.data.filter(item => item !== data.value);
          }
          this.onChange(this.data);
        })
      )
      .subscribe();
  }

  private updateCheckboxList() {
    if (this.checkboxList && this.data.length > 0) {
      this.checkboxList.map((checkbox: MatCheckbox) => {
        if (this.data.includes(checkbox.value)) {
          checkbox.checked = true;
        }
      });
    }
    this.cd.detectChanges();
  }

  private toggleDisableCheckboxList(isDisabled) {
    if (this.checkboxList && this.data.length > 0) {
      this.checkboxList.forEach((checkbox: MatCheckbox) => {
        if (checkbox.disabled !== isDisabled) {
          checkbox.setDisabledState(isDisabled);
        }
      });
    }
  }
}
