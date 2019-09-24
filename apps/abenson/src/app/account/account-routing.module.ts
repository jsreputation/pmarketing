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
  path: 'support', loadChildren: () => import('./customer-support/customer-support.module').then(mod => mod.CustomerSupportModule)
}, {
  path: 'additions',
  loadChildren: () => import('./profile-additions/profile-additions.module').then(mod => mod.ProfileAdditionsModule)
}, {
  path: 'mobile',
  loadChildren: () => import('./change-mobile/change-mobile.module').then(mod => mod.ChangeMobileModule)
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule { }
