import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatListModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ProfileModule, UtilsModule } from '@perxtech/core';
import { AccountComponent } from './account.component';

@NgModule({
  declarations: [AccountComponent],
  exports: [AccountComponent],
  imports: [
    CommonModule,
    UtilsModule,
    MatListModule,
    MatCardModule,
    ProfileModule,
    TranslateModule.forChild(),
    RouterModule
  ]
})
export class AccountModule { }
