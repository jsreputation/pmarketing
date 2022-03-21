import { Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FilterComponent } from '../components/filter/filter.component';

@Injectable({
  providedIn: 'root',
})
export class FilterDialogService {
  private filterDialogRef: MatDialogRef<FilterComponent>;
  constructor(public dialog: MatDialog) {}

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
    if (this.filterDialogRef) {
      this.filterDialogRef.close();
    }
  }
}
