import { Component, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { ICategory } from '../../category.model';
import { categories } from '../../category.mock';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material';

export interface CategoryBottomSheetClosedCallBack {
  categorySelectedCallback(updatedValue: string): void;
  getCurrentSelectedCategory(): string;
}

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss']
})
export class CategorySelectComponent {
  public categories: ICategory[];
  public selectedCategory: string;

  constructor(
    private bottomSheetRef: MatBottomSheetRef<CategorySelectComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: CategoryBottomSheetClosedCallBack
  ) {
    this.categories = categories;
    if (this.data.getCurrentSelectedCategory) {
      this.selectedCategory = this.data.getCurrentSelectedCategory();
    }
  }

  public apply(event: MouseEvent): void {
    if (this.data.categorySelectedCallback) {
      this.data.categorySelectedCallback(this.selectedCategory);
    }
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  public onCategorySelected(category: ICategory): void {
    this.selectedCategory = category.name;
  }

  public dismiss(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
