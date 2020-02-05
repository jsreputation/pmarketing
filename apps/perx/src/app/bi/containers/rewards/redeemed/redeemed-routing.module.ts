import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RedeemedComponent } from './redeemed.component';

const routes: Routes = [{ path: '', component: RedeemedComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RedeemedRoutingModule { }
