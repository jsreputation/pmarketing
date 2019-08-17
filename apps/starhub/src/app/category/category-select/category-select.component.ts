import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';
import { ICategory } from '../../category.model';
import { categories } from '../../category.mock';

@Component({
  selector: 'app-category-select',
  templateUrl: './category-select.component.html',
  styleUrls: ['./category-select.component.scss']
})
export class CategorySelectComponent {
  public categories: ICategory[];

  constructor(
    private bottomSheetRef: MatBottomSheetRef<CategorySelectComponent>
  ) {
    this.categories = categories;
  }

  public apply(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  public dismiss(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }
}
