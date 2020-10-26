import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsAndConditionComponent } from './containers/terms-and-condition/terms-and-condition.component';
import { PrivacyPolicyComponent } from './containers/privacy-policy/privacy-policy.component';
import { FaqComponent } from './containers/faq/faq.component';
const routes: Routes = [
  {
    path: 'tnc',
    component: TermsAndConditionComponent,
  },
  {
    path: 'privacy-policy',
    component: PrivacyPolicyComponent,
  },
  {
    path: 'faq',
    component: FaqComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileAdditionsRoutingModule {}
