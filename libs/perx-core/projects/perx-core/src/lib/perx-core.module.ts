import { NgModule } from '@angular/core';
import { VouchersModule } from './vouchers/vouchers.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShakeTreeComponent } from './shake-tree/shake-tree.component';

import { PuzzlesModule } from './puzzles/puzzles.module';
import { AuthenticationModule } from './auth/authentication/authentication.module';
import { PinataComponent } from './pinata/pinata.component';
import { HttpClientModule } from '@angular/common/http';

const modules = [VouchersModule, PuzzlesModule, AuthenticationModule];

@NgModule({
  declarations: [
    ShakeTreeComponent,
    PinataComponent
  ],
  imports: [
    ...modules,
    ReactiveFormsModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    ...modules,
    ShakeTreeComponent,
    PinataComponent
  ]
})
export class PerxCoreModule {}
