import {
  ChangeDetectionStrategy,
  Component,
  forwardRef,
  Input,
  OnDestroy,
  ViewEncapsulation,
  ChangeDetectorRef
} from '@angular/core';
import { MatChipInputEvent } from '@angular/material';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'cs-tag-list',
  templateUrl: './tag-list.component.html',
  styleUrls: ['./tag-list.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TagListComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class TagListComponent implements OnDestroy, ControlValueAccessor {
  @Input() public visible: boolean = true;
  @Input() public selectable: boolean = true;
  @Input() public removable: boolean = true;
  @Input() public addOnBlur: boolean = true;
  @Input() public placeholder: string = 'Tags';
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  @Input() public set value(setValue: string[]) {
    this.writeValue(setValue);
  }

  constructor(public cd: ChangeDetectorRef) { }
  public tags: string[] = [];
  public control: FormControl = new FormControl();
  private onChange: any = noop;
  // @ts-ignore
  private onTouched: any = noop;

  public ngOnDestroy(): void {
  }

  public add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    if ((value || '').trim()) {
      this.tags.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
    this.onChange(this.tags);
  }

  public remove(tag: string): void {
    const index = this.tags.indexOf(tag);

    if (index >= 0) {
      this.tags.splice(index, 1);
    }

    this.onChange(this.tags);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
    this.control.markAsTouched();
  }

  public setDisabledState(isDisabled: boolean): void {
    if (isDisabled) {
      this.control.disable();
    } else {
      this.control.enable();
    }
  }

  public writeValue(value: any[]): void {
    if (value && value.length > 0) {
      this.tags = value;
    } else {
      this.control.reset('');
    }
    this.onChange(value);
    this.cd.markForCheck();
  }

}
