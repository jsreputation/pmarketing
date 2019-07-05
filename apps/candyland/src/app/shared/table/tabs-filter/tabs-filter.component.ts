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
  @Input() tabs;
  public currentValue;
  public onChange: any = noop;
  public onTouched: any = noop();

  constructor(private cd: ChangeDetectorRef) {
  }

  changeTab(value) {
    this.writeValue(value);
    this.onTouched();
    this.cd.detectChanges();
  }


  public writeValue(value) {
    this.currentValue = value;
    this.onChange(this.currentValue);
  }

  public registerOnChange(fn) {
    this.onChange = fn;
  }

  public registerOnTouched(fn) {
    this.onTouched = fn;
  }
}
