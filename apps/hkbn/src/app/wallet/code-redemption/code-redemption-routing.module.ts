import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CodeRedemptionComponent } from './code-redemption.component';

const routes: Routes = [{
  path: '',
  component: CodeRedemptionComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CodeRedemptionRoutingModule { }
