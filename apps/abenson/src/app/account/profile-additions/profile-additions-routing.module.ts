import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TermsAndConditionComponent } from './containers/terms-and-condition/terms-and-condition.component';

const routes: Routes = [{
  path: 'terms-and-condition',
  component: TermsAndConditionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileAdditionsRoutingModule { }
