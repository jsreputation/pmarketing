import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from './signup.component';

const routes: Routes = [{
  path: '',
  component: SignupComponent,
  data: { countryList: ['Malaysia', 'Singapore']}
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
