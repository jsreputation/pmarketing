import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{
  path: '',
  component: LoadingComponent
}];

@NgModule({
  declarations: [LoadingComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PerxBlackcombPagesModule
  ]
})
export class LoadingModule { }
