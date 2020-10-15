import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  PerxBlackcombPagesModule,
  ProgressCampaignComponent
} from '@perxtech/blackcomb-pages';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: ProgressCampaignComponent },
];

@NgModule({
  imports: [
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes),
  ]
})
export class ProgressCampaignModule { }
