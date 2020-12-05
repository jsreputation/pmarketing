import { LanguageModule } from './../language/language.module';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatCardModule, MatListModule, MatIconModule } from '@angular/material';
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
    LanguageModule,
    TranslateModule.forChild(),
    LoyaltyModule.forChild(),
    RouterModule
  ]
})
export class AccountModule { }
