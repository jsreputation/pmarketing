import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignLandingPageComponent, CampaignLandingPageModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: CampaignLandingPageComponent
}];

@NgModule({
  imports: [
    CampaignLandingPageModule,
    RouterModule.forChild(routes)
  ]
})
export class CampaignLandingModule { }
