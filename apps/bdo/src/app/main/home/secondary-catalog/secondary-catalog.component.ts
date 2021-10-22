import { Component } from '@angular/core';
import { Params, Router } from '@angular/router';
import { CATALOG_CONFIGURATION } from '../../constant/catalog-configuration';

@Component({
  selector: 'bdo-secondary-catalog',
  templateUrl: './secondary-catalog.component.html',
  styleUrls: ['./secondary-catalog.component.scss']
})
export class SecondaryCatalogComponent {
  catalogConfiguation = CATALOG_CONFIGURATION;
  constructor(private route: Router) {}

  navigateToCatalog(tag: string) {
    const queryParams: Params = { type: this.catalogConfiguation.deals.type ,tags: tag };
    this.route.navigate([`catalog-page`], {queryParams: queryParams});
  }
}
