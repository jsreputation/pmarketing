import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RuleBuildingComponent } from './rule-building.component';

const routes: Routes = [{ path: '', component: RuleBuildingComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RuleBuildingRoutingModule { }
