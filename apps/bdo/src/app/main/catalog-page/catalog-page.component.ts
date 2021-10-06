import { Component } from '@angular/core';

@Component({
  selector: 'catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent {
  lstDeal = [
    1,2,3,4
  ]
  constructor() {
   }
  
}
