import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AudiencesPageComponent } from './containers/audiences-page/audiences-page.component';
import { AudiencesUserInfoPageComponent } from './containers/audiences-user-info-page/audiences-user-info-page.component';

const routes: Routes = [
  {
    path: '',
    component: AudiencesPageComponent,
  },
  {
    path: ':id',
    component: AudiencesUserInfoPageComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AudienceRoutingModule {
}
