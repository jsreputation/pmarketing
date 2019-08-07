import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { noop } from 'rxjs';

@Component({
  selector: 'cl-tabs-filter',
  templateUrl: './tabs-filter.component.html',
  styleUrls: ['./tabs-filter.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => TabsFilterComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TabsFilterComponent implements ControlValueAccessor {
  @Input() public tabs: any;

  @Input() set value(setValue: any) {
    this.writeValue(setValue);
  }

  public currentValue: any;
  public onChange: any = noop;
  public onTouched: any = noop();

  constructor(private cd: ChangeDetectorRef) {
  }

  public changeTab(value: any): void {
    this.writeValue(value);
    this.onTouched();
    this.cd.detectChanges();
  }

  public writeValue(value: any): void {
    if (this.currentValue !== value) {
      this.currentValue = value;
      this.onChange(this.currentValue);
    }
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
