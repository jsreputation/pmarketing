import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LoginRoutingModule } from './login-routing.module';
import { SignIn2Component } from '@perxtech/blackcomb-pages';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [SignIn2Component],
  imports: [
    CommonModule,
    LoginRoutingModule,
    SharedModule,
    TranslateModule.forChild()
  ]
})
export class LoginModule { }
