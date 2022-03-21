import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { IFilterModel } from '../../models/filter.model';
import { FilterService } from '../../services/filter.service';
import { CATALOG_CONFIGURATION } from '../../constants/catalog-configuration.const';
import { SPECIAL_CATEGORIES } from '../../utilities/filter.util';

@Component({
  selector: 'bdo-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public filterForm: FormGroup;
  filterSource: IFilterModel;
  catalogConfiguration = CATALOG_CONFIGURATION;
  constructor(
    private fb: FormBuilder,
    public filterService: FilterService,
    public dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    // this.filterSource = this.filterService.currentValue;
    this.filterService.filterValue$.subscribe((filterValue) => {
      console.log('filterValue: ', filterValue);
    });

    this.renderForm();
  }

  getCategoriesFilterSource(categories: any[]) {
    const parentCategories = categories.filter((item) => item.parent === null);
    const childCategories = categories.filter((item) => item.parent !== null);
    return parentCategories.map((parentItem) => {
      return {
        ...parentItem,
        child: childCategories.filter(
          (item) => item.parent.id === parentItem.id
        ),
      };
    });
  }

  applyFilterClick() {
    const formValue = this.filterForm.value;
    formValue.tags = this.filterSource.tags;
    this.dialogRef.close(formValue);
  }

  resetFilterClick() {
    this.filterSource.categories.map((category) => (category.selected = false));
    this.filterSource.tags.map((tag) => (tag.selected = false));
    this.filterSource.locations.map((location) => (location.selected = false));
    this.dialogRef.close(this.filterSource);
  }

  chipClick(index: number) {
    const value = (this.filterForm.get('tags') as FormArray).controls[index]
      .value;
    this.filterSource.tags = this.filterSource.tags.map((item, idx) =>
      index === idx ? { ...item, selected: !value } : { ...item }
    );
    (this.filterForm.get('tags') as FormArray).setValue([
      ...this.filterSource.tags.map((tag) => tag.selected),
    ]);
    (this.filterForm.get('tags') as FormArray).updateValueAndValidity();
  }

  checkCurrentValue(index: number) {
    return (this.filterForm.get('tags') as FormArray).controls[index].value;
  }

  private renderForm() {
    if (this.filterSource) {
      this.filterSource.categories = this.filterSource.categories.filter(
        (category) => {
          return !SPECIAL_CATEGORIES.includes(category.type);
        }
      );
      this.filterForm = this.fb.group({
        categories: new FormArray(
          this.filterSource.categories.map((item) => new FormControl(item))
        ),
        tags: new FormArray(
          this.filterSource.tags.map((item) => new FormControl(item.selected))
        ),
        locations: new FormArray(
          this.filterSource.locations.map((item) => new FormControl(item))
        ),
      });
    }
  }

  public selectCategory(value, idx) {
    const formArray = (this.filterForm.controls.categories as FormArray)
      .controls;
    formArray.forEach((item, index) => {
      // logic for clearing other category selections on selecting in a different category
      if (index != idx && value) {
        item.setValue(
          {
            ...item.value,
            selected: false,
            children: item.value.children.map((child) => ({
              ...child,
              selected: false,
            })),
          },
          { emitEvent: false }
        );
      }
    });
  }

  public locationClick(value: any, index: number) {
    this.filterSource.locations = this.filterSource.locations.map((item, idx) =>
      index === idx ? { ...item, selected: value } : { ...item }
    );
    (this.filterForm.get('locations') as FormArray).setValue([
      ...this.filterSource.locations,
    ]);
    (this.filterForm.get('locations') as FormArray).updateValueAndValidity();
  }
}
