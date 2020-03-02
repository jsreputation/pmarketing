import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChangePasswordComponent, PerxBlackcombPagesModule } from '@perx/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{
  path: '',
  component: ChangePasswordComponent
}];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ChangePasswordComponent,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ]
})
export class ChangePasswordModule { }
