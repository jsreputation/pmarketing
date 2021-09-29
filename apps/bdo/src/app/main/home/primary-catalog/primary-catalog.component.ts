import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import { CategoryModel } from '../../../models/category.model';
import { ScrollToItemDirective } from '../../../shared/directives/scroll-to-item.directive';


@Component({
  selector: 'bdo-primary-catalog',
  templateUrl: './primary-catalog.component.html',
  styleUrls: ['./primary-catalog.component.scss']
})

export class PrimaryCatalogComponent extends ScrollToItemDirective {
  @Input() categories: CategoryModel[] = [];
  @ViewChild('containerCategory', { static: true }) public containerCategory!: ElementRef;

  constructor() {
    super();
   }
}
