import { Component, EventEmitter, Output } from '@angular/core';
import { ICategory } from '../../category.model';
import { categories } from '../../category.mock';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  public categories: ICategory[];

  @Output()
  public tapped: EventEmitter<ICategory> = new EventEmitter<ICategory>();

  constructor() {
    this.categories = categories;
  }

  public selected(category: ICategory): void {
    this.tapped.emit(category);
  }
}
