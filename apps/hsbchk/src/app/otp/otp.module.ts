import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtpRoutingModule } from './otp-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { UtilsModule } from '@perxtech/core';

@NgModule({
  imports: [
    CommonModule,
    OtpRoutingModule,
    UtilsModule,
    SharedModule,
    PerxBlackcombPagesModule,
    TranslateModule.forChild()
  ]
})
export class OtpModule { }
