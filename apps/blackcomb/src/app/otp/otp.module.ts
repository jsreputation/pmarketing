import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { OtpRoutingModule } from './otp-routing.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { EnterPinComponent } from '@perx/blackcomb-pages';
import { UtilsModule } from '@perx/core';

@NgModule({
  declarations: [EnterPinComponent],
  imports: [
    CommonModule,
    OtpRoutingModule,
    UtilsModule,
    SharedModule,
    TranslateModule.forChild()
  ]
})
export class OtpModule { }
