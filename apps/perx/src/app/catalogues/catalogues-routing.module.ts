import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CataloguesComponent } from './catalogues.component';

const routes: Routes = [{ path: '', component: CataloguesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CataloguesRoutingModule { }
