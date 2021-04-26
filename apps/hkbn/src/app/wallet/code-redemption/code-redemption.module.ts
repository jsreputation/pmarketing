import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CodeRedemptionRoutingModule } from './code-redemption-routing.module';
import { CodeRedemptionComponent } from './code-redemption.component';
import { VouchersModule, UtilsModule } from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';
import { MatDialogModule } from '@angular/material/dialog';
@NgModule({
  declarations: [
    CodeRedemptionComponent,
  ],
  imports: [
    CommonModule,
    CodeRedemptionRoutingModule,
    VouchersModule,
    TranslateModule,
    MatDialogModule,
    UtilsModule
  ]
})
export class CodeRedemptionModule { }
