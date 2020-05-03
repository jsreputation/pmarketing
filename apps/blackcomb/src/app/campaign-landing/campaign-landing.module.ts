<<<<<<< HEAD
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignLandingPageComponent, CampaignLandingPageModule } from '@perxtech/blackcomb-pages';
=======
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignLandingPageComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
>>>>>>> PW-3747 bring quiz to blackcomb

const routes: Routes = [{
  path: '',
  component: CampaignLandingPageComponent
}];

@NgModule({
  imports: [
<<<<<<< HEAD
    CampaignLandingPageModule,
    RouterModule.forChild(routes)
=======
    CommonModule,
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes)
  ],
  providers: [
>>>>>>> PW-3747 bring quiz to blackcomb
  ]
})
export class CampaignLandingModule { }
