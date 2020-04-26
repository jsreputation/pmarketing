import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { PerxBlackcombPagesModule, SignIn2Component } from '@perxtech/blackcomb-pages';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{
  path: '',
  component: SignIn2Component
}];

@NgModule({
  imports: [
    CommonModule,
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes),
    SharedModule,
    TranslateModule.forChild()
  ]
})
export class LoginModule { }
