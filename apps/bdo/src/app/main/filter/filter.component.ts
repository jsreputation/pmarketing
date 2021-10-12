
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { FILTER_DATA } from '../../mock-data/filter-data.mock';

@Component({
  selector: 'bdo-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  filterForm: FormGroup;
  filterSource = FILTER_DATA;

  constructor(private fb: FormBuilder) {
    this.renderForm();
  }

  applyFilterClick() {
    console.log(this.filterForm);
  }

  resetFilterClick() {
    this.renderForm();
  }

  chipClick(index: number) {
    const value = (this.filterForm.get('tags') as FormArray).controls[index].value;
    (this.filterForm.get('tags') as FormArray).controls[index].setValue(!value);
    (this.filterForm.get('tags') as FormArray).updateValueAndValidity();
  }

  checkCurrentValue(index: number) {
    return (this.filterForm.get('tags') as FormArray).controls[index].value;
  }

  private renderForm() {
    this.filterForm = this.fb.group({
      accountTypes: new FormArray(this.filterSource.accountTypes.map(item => new FormControl(item.value))),
      categories: new FormArray((this.filterSource.categories.map(item => new FormControl(item)))),
      tags: new FormArray((this.filterSource.tags.map(item => new FormControl(item.value)))),
      locations: new FormArray(this.filterSource.locations.map(item => new FormControl(item)))
    });
  }
}
