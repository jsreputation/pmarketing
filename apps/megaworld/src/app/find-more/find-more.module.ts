import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CampaignsDetailComponent, CampaignsDetailModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: CampaignsDetailComponent
}];

@NgModule({
  imports: [
    CampaignsDetailModule,
    RouterModule.forChild(routes)
  ]
})
export class FindMoreModule { }
