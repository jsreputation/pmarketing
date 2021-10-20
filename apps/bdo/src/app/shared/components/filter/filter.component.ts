import { Component, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { FILTER_DATA } from '../../../mock-data/filter-data.mock';
import { IFilterModel } from '../../models/filter.model';
import { RewardsService } from '@perxtech/core';

@Component({
  selector: 'bdo-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent {
  filterForm: FormGroup;
  filterSource: IFilterModel = FILTER_DATA;
  @Output() applyButtonClick= new EventEmitter();
  @Output() resetButtonClick= new EventEmitter();
  constructor(private fb: FormBuilder, private rewardsService: RewardsService) {
    this.rewardsService.getAllCategories().subscribe((categories)=>{
      this.filterSource.categories = this.getCategoriesFilterSource(categories).map(item=> {
        return {
          name: item.title,
          value: true,
          children: item.child.map(childItem=> { return {name: childItem.title, value: true}})
        }
      });
      this.renderForm();
    });
  }

  getCategoriesFilterSource(categories:any[]) {
    const  parentCategories = categories.filter(item=> item.parent === null);
    const childCategories = categories.filter(item=> item.parent !== null);
      return parentCategories.map(parentItem=>{
        return { ...parentItem, child:childCategories.filter(item=> item.parent.id === parentItem.id)};
      })
  }

  applyFilterClick() {
    this.applyButtonClick.emit(this.filterForm);
  }

  resetFilterClick() {
    this.resetButtonClick.emit();
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
