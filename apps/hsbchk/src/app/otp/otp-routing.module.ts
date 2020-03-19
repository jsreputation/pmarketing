import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnterPinComponent } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: EnterPinComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OtpRoutingModule { }
