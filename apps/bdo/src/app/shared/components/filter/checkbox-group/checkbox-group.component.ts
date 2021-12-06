import { AfterViewInit, Component, EventEmitter, forwardRef, Output } from '@angular/core';

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
  @Output() updateCheckBoxValue: EventEmitter<any> = new EventEmitter();
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

    this.formArray.controls.forEach(control => {
      control.valueChanges.subscribe(value => {
        if (!value && !this.formArray.controls.some(val => val.value)) {
          this.formGroup.controls.category.setValue(false, { emitEvent: false });
        }
        if (value) {
          // const otherSubCategoryControls = this.formArray.controls.filter(item => item !== control);
          // otherSubCategoryControls.forEach(item => {
          //   item.setValue(false, { emitEvent: false })
          // });
          this.formGroup.controls.category.setValue(true, { emitEvent: false });
          this.updateCheckBoxValue.emit(value);
        }
      })
    })

    this.formGroup.controls.category.valueChanges.subscribe(value => {
      this.updateCheckBoxValue.emit(value);
      if (!value) {
        this.formArray.controls.forEach((item) => {
          item.setValue(value, { emitEvent: false });
        })
      }
    });
  }

  registerOnChange(fn): void {
    this.onChange = fn;
  }

  registerOnTouched(fn): void {
    this.onTouched = fn;
  }
}
