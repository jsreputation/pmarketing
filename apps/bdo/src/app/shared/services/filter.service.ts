import { Injectable } from '@angular/core';
import { IFilterModel } from '../models/filter.model';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { FilterComponent } from '../components/filter/filter.component';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  public filterValue$: Subject<IFilterModel> = new Subject<IFilterModel>();
  public currentValue: IFilterModel;
  private filterDialogRef: MatDialogRef<FilterComponent>;
  constructor(public dialog: MatDialog) {}

  public setValue(filterValue: IFilterModel) {
    this.currentValue = filterValue;
    this.filterValue$.next(filterValue);
  }

  public showFilterDialog(onCloseCallback?: (result) => void) {
    this.filterDialogRef = this.dialog.open(FilterComponent, {
      panelClass: 'filter-dialog-container',
      position: { top: '0' },
      data: {},
    });

    this.filterDialogRef.afterClosed().subscribe((result) => {
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
