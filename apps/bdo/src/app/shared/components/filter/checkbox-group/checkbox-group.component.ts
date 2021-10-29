import { AfterViewInit, Component, forwardRef } from '@angular/core';

import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormBuilder,
  FormArray,
  FormGroup,
  FormControl,
} from '@angular/forms';
import { CheckboxModel } from '../../../../models/checkbox.model';

@Component({
  selector: 'bdo-checkbox-group',
  templateUrl: './checkbox-group.component.html',
  styleUrls: ['./checkbox-group.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => CheckboxGroupComponent),
      multi: true,
    },
  ],
})
export class CheckboxGroupComponent implements ControlValueAccessor, AfterViewInit{
  formGroup: FormGroup;
  dataSource: CheckboxModel;
  formArray: FormArray = new FormArray([]);
  hiddenToggle = false;

  onChange: (value) => void;
  onTouched: () => void;

  constructor(public fb: FormBuilder) {}

  ngAfterViewInit(): void {
    this.formGroup && this.formGroup.valueChanges.subscribe((output: any) => {
      const value: CheckboxModel = {
        name: this.dataSource.name,
        selected: output.category,
        type: this.dataSource.type,
        children: output.children.map((value, index) => ({
            name: this.dataSource.children[index].name,
            type: this.dataSource.children[index].type,
            selected: value
        }))
      };
      this.onChange(value);
    });

    this.formGroup && this.formGroup.controls.category.valueChanges.subscribe((output) => {
      this.formArray.controls.forEach((item) => {
        item.setValue(output);
      })
    });
  }

  writeValue(obj): void {
    this.dataSource = obj;
    this.hiddenToggle = !this.dataSource.children || !this.dataSource.children.length;
    this.formArray = new FormArray([]);
    this.dataSource.children && this.dataSource.children.forEach((control) => {
      this.formArray.push(
        new FormControl(control.selected)
      );
    });
    this.formGroup = this.fb.group({
      category: [this.dataSource.selected],
      children: this.formArray,
    });
  }

  registerOnChange(fn): void {
    this.onChange = fn;
  }

  registerOnTouched(fn): void {
    this.onTouched = fn;
  }
}
