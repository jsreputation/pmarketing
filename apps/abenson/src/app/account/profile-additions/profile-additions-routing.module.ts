import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PrivacyPolicyComponent } from './containers/privacy-policy/privacy-policy.component';

const routes: Routes = [{
  path: 'privacy-policy',
  component: PrivacyPolicyComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileAdditionsRoutingModule { }
