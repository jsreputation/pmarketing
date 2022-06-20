import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import {
  LoyaltyModule,
  PipeUtilsModule,
  ProfileModule,
  UtilsModule,
} from '@perxtech/core';
import { TranslateModule } from '@ngx-translate/core';

import { AccountComponent } from './account.component';

const routes: Routes = [
  {
    path: '',
    component: AccountComponent,
  },
];

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    UtilsModule,
    MatListModule,
    MatCardModule,
    ProfileModule,
    MatIconModule,
    TranslateModule,
    LoyaltyModule,
    PipeUtilsModule,
    RouterModule.forChild(routes),
  ],
})
export class AccountModule {}
