import {
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  Optional
} from '@angular/core';
import { Subject } from 'rxjs';
import { FormControl, NgControl } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material/form-field';

let nextUniqueId = 0;

export class CsFormFieldControl<T> implements MatFormFieldControl<T> {
  public controlType: string = 'cs-input';
  public readonly stateChanges: Subject<void> = new Subject<void>();
  public focused: boolean = false;
  protected protectedId: string;
  protected protectedUid: string;
  protected protectedValue: T;
  protected protectedDisabled: boolean = false;
  protected protectedRequired: boolean = false;
  protected protectedPlaceholder: string;
  protected protectedReadonly: boolean = false;
  protected protectedErrorState: boolean = false;

  @Input() public autofilled: boolean = false;
  @HostBinding('attr.aria-describedby') public describedBy: string = '';

  public setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  @HostListener('blur', ['false'])
  @HostListener('focus', ['true'])
  public focusChanged(isFocused: boolean): void {
    if (isFocused !== this.focused && !this.protectedReadonly) {
      this.focused = isFocused;
      this.stateChanges.next();
    }
  }

  @Input()
  public set disabled(value: boolean) {
    this.protectedDisabled = !!value;
    if (this.control) {
      if (value) {
        this.control.disable();
      } else {
        this.control.enable();
      }
    }
    if (this.focused) {
      this.focused = false;
      this.stateChanges.next();
    }
  }

  public get disabled(): boolean {
    if (this.control && this.control.disabled !== null) {
      return this.control.disabled;
    }
    return this.protectedDisabled;
  }

  @Input()
  public set placeholder(value: string) {
    this.protectedPlaceholder = value;
  }

  public get placeholder(): string {
    return this.protectedPlaceholder;
  }

  @HostBinding('attr.id')
  @Input()
  public get id(): string {
    return this.protectedId;
  }

  public set id(value: string) {
    this.protectedId = value || this.protectedUid;
  }

  @Input()
  public get required(): boolean {
    return this.protectedRequired;
  }

  public set required(value: boolean) {
    this.protectedRequired = !!value;
  }

  @Input()
  public get readonly(): boolean {
    return this.protectedReadonly;
  }

  public set readonly(value: boolean) {
    this.protectedReadonly = !!value;
  }

  public get value(): T {

    if (this.control) {
      return this.control.value;
    }
    if (this.element) {
      return this.element.value;
    }
    return this.protectedValue;
  }

  public set value(newValue: T) {
    // tslint:disable-next-line:no-accessor-recursion
    if (this.value === newValue) {
      return;
    }
    if (this.control) {
      this.control.patchValue(newValue);
    }
    if (this.element) {
      this.element.value = newValue;
    }
    this.protectedValue = newValue;
    this.stateChanges.next();
  }

  public get empty(): boolean {
    return !this.value;
  }

  @HostBinding('class.mat-form-field-should-float')
  public get shouldLabelFloat(): boolean {
    return this.focused || !this.empty || this.placeholder !== undefined;
  }

  public get errorState(): boolean {
    if (this.control) {
      return this.control.hasError && this.control.touched;
    }
    return this.protectedErrorState;
  }

  public set errorState(value: boolean) {
    this.protectedErrorState = !!value;
  }

  public get element(): any {
    return this.elem ? this.elem.nativeElement : null;
  }

  public get control(): FormControl | null {
    return this.ngControl ? this.ngControl.control as FormControl : null;
  }

  constructor(@Optional() protected type: string | null = null,
              @Optional() public ngControl: NgControl | null = null,
              @Optional() protected elem: ElementRef | null = null
  ) {
    if (type) {
      this.controlType = type;
    }
    this.protectedUid = `${this.controlType}-${nextUniqueId++}`;
    this.id = this.id;
  }

  public onContainerClick = (): void => {
  }
}
