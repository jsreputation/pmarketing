import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerxBlackcombPagesModule, RazProgressCampaignComponent } from '@perxtech/blackcomb-pages';


const routes: Routes = [
  { path: '', pathMatch: 'full', component: RazProgressCampaignComponent },
];

@NgModule({
  imports: [
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes),
  ]
})
export class LegacyProgressCampaignModule { }
