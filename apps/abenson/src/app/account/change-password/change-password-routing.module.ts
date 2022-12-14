import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChangePasswordComponent } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: ChangePasswordComponent,
  data: { minLen: 4 }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangePasswordRoutingModule { }
