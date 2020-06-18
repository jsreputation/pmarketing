import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignStampsComponent, CampaignStampsModule as BCPCampaignStampsModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: CampaignStampsComponent
}];

@NgModule({
  imports: [
    BCPCampaignStampsModule,
    RouterModule.forChild(routes),
  ]
})
export class SHStampsModule { }
