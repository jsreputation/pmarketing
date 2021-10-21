import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { takeUntil } from 'rxjs/operators';
import { RewardsService } from '@perxtech/core';
import { SelfDestruct } from '../../utilities/self-destruct.component';
import { IFilterModel } from '../../models/filter.model';
import { FilterService } from '../../services/filter.service';
import { FILTER_DATA } from '../../../mock-data/filter-data.mock';

@Component({
  selector: 'bdo-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent extends SelfDestruct implements OnInit, OnDestroy {
  public filterForm: FormGroup;
  filterSource: IFilterModel

  constructor(private fb: FormBuilder,
              private rewardsService: RewardsService,
              public filterService: FilterService,
              public dialogRef: MatDialogRef<FilterComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
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


  ngOnInit(): void {
    this.filterService.setValue({ searchValue: '', ...FILTER_DATA });
    this.filterService.filterValue$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this.filterSource = value;
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
    this.dialogRef.close(this.filterSource);
  }

  resetFilterClick() {
    this.filterService.setValue({ searchValue: '', ...FILTER_DATA });
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
