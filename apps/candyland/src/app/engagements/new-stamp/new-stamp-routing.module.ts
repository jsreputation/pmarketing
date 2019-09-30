import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NewStampComponent } from './containers/new-stamp/new-stamp.component';

const routes: Routes = [
  {
    path: '',
    component: NewStampComponent
  },
  {
    path: ':id',
    component: NewStampComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NewStampRoutingModule {
}
