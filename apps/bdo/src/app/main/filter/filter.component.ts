
import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { FILTER_DATA } from '../../mock-data/filter-data.mock';
import { FilterService } from '../../shared/services/filter.service';

@Component({
  selector: 'bdo-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  filterForm: FormGroup;
  filterSource;

  constructor(private fb: FormBuilder, private filterService: FilterService) {
    this.filterSource = this.filterService.getFilterValue;
    this.renderForm();
  }

  applyFilterClick() {
    this.filterService.setFilterValue({searchValue:'',...this.filterForm.value});
  }

  resetFilterClick() {
    this.filterService.initialFilterValue();
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
