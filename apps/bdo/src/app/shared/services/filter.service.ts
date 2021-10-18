import { Injectable } from '@angular/core';
import { IFilterModel } from '../models/filter.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FilterComponent } from '../../main/filter/filter.component';
import { BehaviorSubject } from 'rxjs';

const initValue: IFilterModel = {
  searchValue: '',
  accountTypes: [],
  categories: [],
  tags: [],
  locations: []
};

@Injectable({
  providedIn: 'root'
})
export class FilterService {
  public filterValue$: BehaviorSubject<IFilterModel> = new BehaviorSubject<IFilterModel>(initValue);
  private queryParams: any;
  private filterDialogRef: MatDialogRef<FilterComponent>;

  constructor(public dialog: MatDialog) {
  }
  
  public setValue(filterValue: IFilterModel) {
    const value = this.mapQueryParamsToFilterObject(filterValue);
    this.filterValue$.next(value);
  }

  public setParams(params: any) {
    this.queryParams = params;
  }

  public mapQueryParamsToFilterObject(filterValue: IFilterModel) {
    if (filterValue && this.queryParams) {
      Object.keys(filterValue)
        .forEach(key => {
          if (this.queryParams[key]) {
            filterValue[key] = filterValue[key].map(item => ({
              ...item,
              value: this.queryParams[key] === item.name || (Array.isArray(this.queryParams[key]) && this.queryParams[key].includes(item))
            }));
          }
        });
    }
    return filterValue;
  }

  public showFilterDialog(onCloseCallback?: (result) => void) {
    this.filterDialogRef = this.dialog.open(FilterComponent, {
      panelClass: 'filter-dialog-container',
      position: { top: '0' },
      data: {}
    });


      this.filterDialogRef.afterClosed().subscribe(result => {
        this.filterDialogRef = undefined;
        if (onCloseCallback) {
          onCloseCallback(result);
        }
      });
  }

  public isOpen() {
    return this.filterDialogRef !== undefined;
  }

  public closeFilter() {
    this.filterDialogRef.close();
  }
}
