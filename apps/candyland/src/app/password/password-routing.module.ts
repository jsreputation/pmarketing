import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UpdateUserComponent } from './containers/update-user/update-user.component';
import { ForgetPasswordComponent } from './containers/forget-password/forget-password.component';

const routes: Routes = [
  { path: 'forget', component: ForgetPasswordComponent },
  { path: 'invalid', component: UpdateUserComponent },
  { path: 'reset', component: UpdateUserComponent },
  { path: 'confirm', component: UpdateUserComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PasswordRoutingModule { }
