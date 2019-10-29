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
import { merge, noop, Subject, Subscription } from 'rxjs';
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
  private destroy$: Subject<any> = new Subject();
  private onChange: any = noop;
  private changeSubscription: Subscription;
  // @ts-ignore
  private onTouched: any = noop;

  constructor(private cd: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.handlCheckboxList();
    this.handleState();
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

  private handlCheckboxList(): void {
    if (this.changeSubscription) {
      this.changeSubscription.unsubscribe();
    }
    this.changeSubscription = merge(...this.checkboxList.map(value => value.change))
      .pipe(
        distinctUntilChanged(),
        map((data: any) => ({ checked: data.checked, value: data.source.value })),
        tap((data: any) => {
          if (data.checked) {
            this.data.push(data.value);
          } else {
            this.data = this.data.filter(item => item !== data.value);
          }
          this.onChange(this.data);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe(() => { });
  }

  private updateCheckboxList(): void {
    if (this.checkboxList && this.data.length > 0) {
      this.checkboxList.map((checkbox: MatCheckbox) => {
        if (this.data.includes(checkbox.value)) {
          checkbox.checked = true;
        } else {
          checkbox.checked = false;
        }
      });
    }
    this.cd.detectChanges();
  }

  private toggleDisableCheckboxList(isDisabled: boolean): void {
    if (this.checkboxList && this.data.length > 0) {
      this.checkboxList.forEach((checkbox: MatCheckbox) => {
        if (checkbox.disabled !== isDisabled) {
          checkbox.setDisabledState(isDisabled);
        }
      });
    }
  }

  private handleState(): void {
    this.checkboxList.changes
      .pipe(takeUntil(this.destroy$))
      .subscribe((() => {
        this.handlCheckboxList();
      }));
  }
}
