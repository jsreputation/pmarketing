import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { PerxBlackcombPagesModule } from '@perx/blackcomb-pages';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    PerxBlackcombPagesModule,
    LoginRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ]
})
export class LoginModule { }
