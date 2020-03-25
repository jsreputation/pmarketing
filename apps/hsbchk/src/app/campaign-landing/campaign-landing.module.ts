import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignLandingPageComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { ICampaignService } from '@perxtech/core';
import { campaignServiceStub } from '../mock/quiz.mock';

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
    { provide: ICampaignService, useValue: campaignServiceStub }
  ]
})
export class CampaignLandingModule { }
