import { Component } from '@angular/core';
import { Params, Router } from '@angular/router';
import { CATALOG_CONFIGURATION } from '../../constant/catalog-configuration';

@Component({
  selector: 'bdo-secondary-catalog',
  templateUrl: './secondary-catalog.component.html',
  styleUrls: ['./secondary-catalog.component.scss']
})
export class SecondaryCatalogComponent {
  catalogConfiguration = CATALOG_CONFIGURATION;
  dealsCategory = CATALOG_CONFIGURATION.deals.subCategory;
  constructor(private route: Router) {}

  navigateToCatalog(tag: string) {
    const queryParams: Params = { type: tag };
    this.route.navigate([`catalog-page`], { queryParams: queryParams });
  }
}
