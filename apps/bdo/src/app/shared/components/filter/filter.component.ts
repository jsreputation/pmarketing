import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { SelfDestruct } from '../../utilities/self-destruct.component';
import { IFilterModel } from '../../models/filter.model';
import { FilterService } from '../../services/filter.service';
import { FILTER_DATA } from '../../constants/filter-configuration.const';
import { CATALOG_CONFIGURATION } from '../../constants/catalog-configuration.const';

@Component({
  selector: 'bdo-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent extends SelfDestruct implements OnInit, OnDestroy {
  public filterForm: FormGroup;
  filterSource: IFilterModel;
  catalogConfiguration = CATALOG_CONFIGURATION;
  constructor(
    private fb: FormBuilder,
    public filterService: FilterService,
    public dialogRef: MatDialogRef<FilterComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }

  ngOnInit(): void {
    this.filterService.filterValue$
      .pipe(takeUntil(this.destroy$))
      .subscribe((value) => {
        this.filterSource = value;
        this.renderForm();
      });
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
    this.filterService.setValue(FILTER_DATA);
  }

  chipClick(index: number) {
    const value = (this.filterForm.get('tags') as FormArray).controls[index]
      .value;
    (this.filterForm.get('tags') as FormArray).controls[index].setValue(!value);
    (this.filterForm.get('tags') as FormArray).updateValueAndValidity();
    this.filterSource.tags = this.filterSource.tags.map(
      (item, idx) => index === idx ? { ...item, selected: !value} : item
    )
  }

  checkCurrentValue(index: number) {
    return (this.filterForm.get('tags') as FormArray).controls[index].value;
  }

  private renderForm() {
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
