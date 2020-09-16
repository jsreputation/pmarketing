import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  PerxBlackcombPagesModule,
  StampCampaignHomeComponent,
} from '@perxtech/blackcomb-pages';

const routes: Routes = [
  { path: '', component: StampCampaignHomeComponent },
];

@NgModule({
  imports: [
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes),
  ]
})
export class StampCampaignHomeModule { }
