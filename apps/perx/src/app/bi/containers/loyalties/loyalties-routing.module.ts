import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoyaltiesComponent } from './loyalties.component';

const routes: Routes = [{ path: '', component: LoyaltiesComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoyaltiesRoutingModule { }
