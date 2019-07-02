import {ChangeDetectionStrategy, Component, forwardRef, Input} from '@angular/core';
import {ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR} from '@angular/forms';

@Component({
  selector: 'cl-search-filter',
  templateUrl: './search-filter.component.html',
  styleUrls: ['./search-filter.component.scss'],
  // providers: [
  //   {
  //     provide: NG_VALUE_ACCESSOR,
  //     useExisting: forwardRef(() => SearchFilterComponent),
  //     multi: true,
  //   }
  // ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearchFilterComponent  {
  @Input() control: FormControl;

  constructor() {
  }

  // registerOnChange(fn: any): void {
  // }
  //
  // registerOnTouched(fn: any): void {
  // }
  //
  // setDisabledState(isDisabled: boolean): void {
  // }
  //
  // writeValue(obj: any): void {
  // }

}
