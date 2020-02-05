import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';
import { SortingMode } from '../category.model';

export interface SortBottomSheetClosedCallBack {
  sortOrderSelectedCallback(updatedValue: string): void;
  getCurrentSelectedOrder(): SortingMode;
}

@Component({
  selector: 'app-category-sort',
  templateUrl: './category-sort.component.html',
  styleUrls: ['./category-sort.component.scss']
})
export class CategorySortComponent {
  public sortingCriterias: string[] = [SortingMode.ending_soon, SortingMode.latest];
  public selectedCriteria: string;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<CategorySortComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: SortBottomSheetClosedCallBack
  ) {
    if (this.data.getCurrentSelectedOrder) {
      this.selectedCriteria = this.data.getCurrentSelectedOrder();
    }
  }

  public apply(event: MouseEvent): void {
    if (this.data.sortOrderSelectedCallback) {
      this.data.sortOrderSelectedCallback(this.selectedCriteria);
    }
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  public dismiss(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  public onSortingOrderSelected(criteria: string): void {
    this.selectedCriteria = criteria;
  }

}
