import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ChangePasswordComponent,
  PerxBlackcombPagesModule
} from '@perxtech/blackcomb-pages';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{
  path: '',
  component: ChangePasswordComponent,
  data: { minLen: 6 }
}];

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PerxBlackcombPagesModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes)
  ]
})
export class ChangePasswordModule { }
