import { Component } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material';

@Component({
  selector: 'app-category-sort',
  templateUrl: './category-sort.component.html',
  styleUrls: ['./category-sort.component.scss']
})
export class CategorySortComponent {
  public sortingCriterias: string[] = ['Popularity', 'Latest', 'Ending Soon'];
  constructor(
    private bottomSheetRef: MatBottomSheetRef<CategorySortComponent>
  ) { }

  public apply(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

  public dismiss(event: MouseEvent): void {
    this.bottomSheetRef.dismiss();
    event.preventDefault();
  }

}
