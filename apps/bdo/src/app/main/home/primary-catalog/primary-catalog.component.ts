
import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import {  Router } from '@angular/router';
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

  constructor(private router:Router,) {
    super();
   }
   navigateToCatalog(category,subCategory){
     this.router.navigate(["/catalog-page"], { state:{categoryCode:category.code,subCategoried:[subCategory]}});
   }
}
