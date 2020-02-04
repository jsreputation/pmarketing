import { ChangeDetectionStrategy, ChangeDetectorRef, Component, forwardRef, Input, ElementRef, ViewChild, DoCheck, AfterViewInit } from '@angular/core';

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
export class TabsFilterComponent implements ControlValueAccessor, DoCheck, AfterViewInit {
  @Input() public tabs: any;

  @Input() public set value(setValue: any) {
    this.writeValue(setValue);
  }

  public currentValue: any;
  public onChange: any = noop;
  public onTouched: any = noop();

  @ViewChild('labelContainer', { static: false }) public labelContainer: ElementRef;
  public showScrollButtons: any = true;

  constructor(private cd: ChangeDetectorRef, private el: ElementRef) {
  }

  public ngAfterViewInit(): void {
    this.labelContainer.nativeElement.querySelector('.mat-tab-links').style.display = 'flex';
  }

  public ngDoCheck(): void {
    if (this.labelContainer) {
      if (
        this.labelContainer.nativeElement.clientWidth -
        this.labelContainer.nativeElement.firstElementChild.clientWidth
        > 0
      ) {
        this.showScrollButtons = false;
      } else {
        this.showScrollButtons = true;
      }
    }
  }

  public left(): void {
    const el = this.el.nativeElement.querySelector('.mat-tab-label-container');
    el.scrollLeft -= 100;
  }

  public right(): void {
    const el = this.el.nativeElement.querySelector('.mat-tab-label-container');
    el.scrollLeft += 100;
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
