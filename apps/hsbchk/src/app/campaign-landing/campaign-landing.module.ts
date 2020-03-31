import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignLandingPageComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: CampaignLandingPageComponent
}];

@NgModule({
  imports: [
    CommonModule,
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes)
  ],
  providers: [
  ]
})
export class CampaignLandingModule { }
