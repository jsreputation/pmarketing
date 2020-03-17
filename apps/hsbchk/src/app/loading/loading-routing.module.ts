import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoadingComponent } from '@perx/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: LoadingComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoadingRoutingModule { }
