import { Component, EventEmitter, Output } from '@angular/core';

export interface ICategory {
  name: string;
  icon: string;
}

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
    this.categories = [
      {
        name: 'All',
        icon: 'apps'
      },
      {
        name: 'Food & Beverage',
        icon: 'local_dining'
      },
      {
        name: 'Shopping',
        icon: 'shopping_cart'
      }
    ];
  }

  public selected(category: ICategory): void {
    this.tapped.emit(category);
  }
}
