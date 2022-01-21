import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NearmeComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: NearmeComponent
}];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    PerxBlackcombPagesModule
  ]
})
export class NearmeModule { }
