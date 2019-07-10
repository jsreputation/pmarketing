import { NgModule } from '@angular/core';
import { VouchersModule } from './vouchers/vouchers.module';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ShakeTreeComponent } from './shake-tree/shake-tree.component';
import { PopupComponent } from './popup/popup.component';

import { MatDialogModule, MatButtonModule } from '@angular/material';
import { PuzzlesModule } from './puzzles/puzzles.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { PinataComponent } from './pinata/pinata.component';
import { HttpClientModule } from '@angular/common/http';

const modules = [VouchersModule, PuzzlesModule, AuthenticationModule];

@NgModule({
  declarations: [
    ShakeTreeComponent,
    PopupComponent,
    PinataComponent
  ],
  imports: [
    ...modules,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    HttpClientModule,
    CommonModule
  ],
  exports: [
    ...modules,
    ShakeTreeComponent,
    PopupComponent,
    PinataComponent
  ]
})
export class PerxCoreModule {}
