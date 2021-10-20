import { Component} from '@angular/core';
import { SubCategory } from '../../models/category.model';
import { filterModel } from '../../models/filter.model';

@Component({
  selector: 'bdo-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent {
  categoryCode: string;
  subCategoryCodeSelected:SubCategory[];
 
  ngOnInit(): void {
     this.categoryCode = history.state.categoryCode;
     this.subCategoryCodeSelected = history.state.subCategoried;
  }
  
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
