import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { LoyaltyModule, ProfileModule, UtilsModule } from '@perxtech/core';
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
    MatIconModule,
    TranslateModule.forChild(),
    LoyaltyModule.forChild(),
    RouterModule
  ]
})
export class AccountModule { }
