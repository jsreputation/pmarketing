import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerxBlackcombPagesModule, RazProgressCampaignHomeComponent, } from '@perxtech/blackcomb-pages';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: RazProgressCampaignHomeComponent },
];

@NgModule({
  imports: [
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes),
  ]
})
export class LegacyProgressCampaignHomeModule { }

