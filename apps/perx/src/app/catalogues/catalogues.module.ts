import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CataloguesRoutingModule } from './catalogues-routing.module';
import { CataloguesComponent } from './catalogues.component';


@NgModule({
  declarations: [CataloguesComponent],
  imports: [
    CommonModule,
    CataloguesRoutingModule
  ]
})
export class CataloguesModule { }
