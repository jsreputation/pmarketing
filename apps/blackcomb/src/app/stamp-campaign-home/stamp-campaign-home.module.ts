import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  PerxBlackcombPagesModule,
  StampCampaignHomeComponent
} from '@perxtech/blackcomb-pages';
import { ConfigModule } from '@perxtech/core';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: StampCampaignHomeComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [
    ConfigModule.forChild(),
    PerxBlackcombPagesModule,
    CommonModule,
    RouterModule.forChild(routes),
  ]
})
export class StampCampaignHomeModule { }
