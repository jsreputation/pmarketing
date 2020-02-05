import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnDestroy,
  ViewEncapsulation,
  ChangeDetectorRef, Optional, Self
} from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ControlValueAccessor, FormControl, NgControl } from '@angular/forms';
import { noop } from 'rxjs';
import { CsFormFieldControl } from '../form-field-control';
import { MatFormFieldControl } from '@angular/material/form-field';

@Component({
  selector: 'cs-chip-list',
  templateUrl: './chip-list.component.html',
  styleUrls: ['./chip-list.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: ChipListComponent
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class ChipListComponent extends CsFormFieldControl<string[]> implements OnDestroy, ControlValueAccessor {
  @Input() public selectable: boolean = true;
  @Input() public removable: boolean = true;
  @Input() public addOnBlur: boolean = true;
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public inputControl: FormControl = new FormControl();
  private onChange: any = noop;
  private onTouched: any = noop;

  public get empty(): boolean {
    return !this.value || (this.value as []).length === 0;
  }

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private cd: ChangeDetectorRef
  ) {
    super('cs-chip-list', ngControl);
    if (this.ngControl) {
      this.ngControl.valueAccessor = this;
    }
    this.value = [];
  }

  public ngOnDestroy(): void {
    this.stateChanges.complete();
    this.cd.detach();
  }

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.value.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
    this.updateValue(this.value);
  }

  public remove(tag: string): void {
    const index = this.value.indexOf(tag);

    if (index >= 0) {
      this.value.splice(index, 1);
    }

    this.updateValue(this.value);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  public writeValue(value: string[]): void {
    if (value && value.length > 0) {
      this.value = value;
    } else {
      this.value = [];
      this.inputControl.reset('');
    }
    this.updateValue(this.value);
  }

  private updateValue(value: string[]): void {
    this.onChange(value);
    this.onTouched();
    this.cd.markForCheck();
  }

}
