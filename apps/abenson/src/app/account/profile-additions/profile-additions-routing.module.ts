import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FaqComponent } from './containers/faq/faq.component';

const routes: Routes = [{
  path: 'faq',
  component: FaqComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileAdditionsRoutingModule { }
