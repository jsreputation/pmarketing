import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ImpressionsComponent } from './impressions.component';

const routes: Routes = [{ path: '', component: ImpressionsComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ImpressionsRoutingModule { }
