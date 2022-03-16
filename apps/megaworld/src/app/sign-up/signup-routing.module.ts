import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './sign-up.component';


const routes: Routes = [
  { path: '', component: SignupComponent, data: { countryList: ['Malaysia', 'Singapore'] } },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SignupRoutingModule { }
