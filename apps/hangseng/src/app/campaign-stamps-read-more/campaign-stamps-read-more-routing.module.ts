import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CampaignStampsReadMoreComponent } from './campaign-stamps-read-more.component';

const routes: Routes = [{ path: '', component: CampaignStampsReadMoreComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CampaignStampsReadMoreRoutingModule { }
