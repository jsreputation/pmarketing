import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CatalogComponent, CatalogModule as BCPCatalogModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: CatalogComponent
}];

@NgModule({
  imports: [
    BCPCatalogModule,
    RouterModule.forChild(routes)
  ]
})
export class CatalogModule { }
