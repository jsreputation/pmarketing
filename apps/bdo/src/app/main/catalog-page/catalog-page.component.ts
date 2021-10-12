import { Component } from '@angular/core';
import { filterModel } from '../../models/filter.model';

@Component({
  selector: 'bdo-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent {
  lstCategory: filterModel[] = [
    {
      name: "Essentials",
      linkImage: 'assets/images/grocery-enclosed-outline-fullcolor.svg'

    },
    {
      name: "Pay Bills",
      linkImage: 'assets/images/pay_bills-enclosed-outline-fullcolor.svg'

    },
    {
      name: "Entertainment",
      linkImage: 'assets/images/entertainment-enclosed-outline-fullcolor.svg'

    }
  ]
}
