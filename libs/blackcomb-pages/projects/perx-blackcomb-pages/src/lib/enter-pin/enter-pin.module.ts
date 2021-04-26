import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsModule } from '@perxtech/core';
import { EnterPinComponent } from './enter-pin.component';

@NgModule({
  declarations: [EnterPinComponent],
  exports: [EnterPinComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    RouterModule,
    UtilsModule,
    MatToolbarModule,
    MatButtonModule
  ]
})
export class EnterPinModule { }
