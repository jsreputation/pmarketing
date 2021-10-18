import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, FormArray } from '@angular/forms';
import { FilterService } from '../../shared/services/filter.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FILTER_DATA } from '../../mock-data/filter-data.mock';
import { SelfDestruct } from '../../shared/utilities/self-destruct.component';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'bdo-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent extends SelfDestruct implements OnInit, OnDestroy {
  public filterForm: FormGroup;
  public filterValue;

  constructor(private fb: FormBuilder,
              public filterService: FilterService,
              public dialogRef: MatDialogRef<FilterComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    super();
  }


  ngOnInit(): void {
    this.filterService.setValue({ searchValue: '', ...FILTER_DATA });
    this.filterService.filterValue$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(value => {
        this.filterValue = value;
        this.renderForm();
      });
  }

  applyFilterClick() {
    this.dialogRef.close(this.filterValue);
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
      accountTypes: new FormArray(this.filterValue.accountTypes.map(item => new FormControl(item.value))),
      categories: new FormArray((this.filterValue.categories.map(item => new FormControl(item)))),
      tags: new FormArray((this.filterValue.tags.map(item => new FormControl(item.value)))),
      locations: new FormArray(this.filterValue.locations.map(item => new FormControl(item)))
    });
  }
}
