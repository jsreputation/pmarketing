import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AudiencesPageComponent } from './containers/audiences-page/audiences-page.component';

const routes: Routes = [
  {
    path: '',
    component: AudiencesPageComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AudienceRoutingModule {
}
