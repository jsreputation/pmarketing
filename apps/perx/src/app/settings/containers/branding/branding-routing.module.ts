import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BrandingComponent } from './branding.component';

const routes: Routes = [{ path: '', component: BrandingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BrandingRoutingModule { }
