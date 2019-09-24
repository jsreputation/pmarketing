import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AccountComponent } from './account.component';

const routes: Routes = [{
  path: '',
  component: AccountComponent
}, {
  path: 'change-password',
  loadChildren: () => import('./change-password/change-password.module').then(mod => mod.ChangePasswordModule)
}, {
  path: 'profile', loadChildren: () => import('./profile/profile.module').then(mod => mod.ProfileModule)
}, {
  path: 'additions',
  loadChildren:  () => import('./profile-additions/profile-additions.module').then(mod => mod.ProfileAdditionsModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
