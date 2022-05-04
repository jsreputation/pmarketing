import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignLandingPageComponent, CampaignLandingPageModule } from '@perxtech/blackcomb-pages';
import { TeamsServiceModule as PerxTeamsServiceModule } from '@perxtech/core';

const routes: Routes = [{
  path: '',
  component: CampaignLandingPageComponent
}];

@NgModule({
  imports: [
    PerxTeamsServiceModule.forChild(),
    CampaignLandingPageModule,
    RouterModule.forChild(routes)
  ]
})
export class CampaignLandingModule { }
