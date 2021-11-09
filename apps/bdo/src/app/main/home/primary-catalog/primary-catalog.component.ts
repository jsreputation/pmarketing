import { Component, ViewChild, ElementRef, Input } from '@angular/core';
import {  Params, Router } from '@angular/router';
import { ScrollToItemDirective } from '../../../shared/directives/scroll-to-item.directive';
import { ItemModel } from '../../../shared/models/item.model';

@Component({
  selector: 'bdo-primary-catalog',
  templateUrl: './primary-catalog.component.html',
  styleUrls: ['./primary-catalog.component.scss']
})

export class PrimaryCatalogComponent extends ScrollToItemDirective {
  @Input() categories: ItemModel[] = [];
  @ViewChild('containerCategory', { static: true }) public containerCategory!: ElementRef;
  constructor(private router:Router,) {
    super();
   }
   navigateToCatalog(type:string){
    const queryParams: Params = { type: type };
     this.router.navigate(["/catalog-page"], { queryParams });
   }
}
