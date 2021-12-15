import { Component, ViewChild, ElementRef } from '@angular/core';
import {  Params, Router } from '@angular/router';
import { ScrollToItemDirective } from '../../../shared/directives/scroll-to-item.directive';

@Component({
  selector: 'bdo-primary-catalog',
  templateUrl: './primary-catalog.component.html',
  styleUrls: ['./primary-catalog.component.scss']
})

export class PrimaryCatalogComponent extends ScrollToItemDirective {
  @ViewChild('containerCategory', { static: true }) public containerCategory!: ElementRef;
  constructor(private router:Router,) {
    super();
   }
   navigateToCatalog(type:string){
    const queryParams: Params = { type: type };
     this.router.navigate(["/catalog-page"], { queryParams });
   }
}
