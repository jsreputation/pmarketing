import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerxBlackcombPagesModule, ProgressCampaignComponent, } from '@perxtech/blackcomb-pages';
import {
  LocationServiceModule,
  ProgressCampaignServiceModule as PerxProgressCampaignServiceModule
} from '@perxtech/core';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: ProgressCampaignComponent },
];

@NgModule({
  imports: [
    PerxProgressCampaignServiceModule.forChild(),
    LocationServiceModule.forChild(),
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes),
  ]
})
export class ProgressCampaignModule { }
ˆ
