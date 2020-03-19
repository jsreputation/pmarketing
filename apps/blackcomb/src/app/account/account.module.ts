import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatCardModule,
  MatListModule,
} from '@angular/material';
import {
  RouterModule,
  Routes,
} from '@angular/router';

import { UtilsModule } from '@perxtech/core';
import { AccountComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: AccountComponent
}];

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    MatCardModule,
    MatListModule,
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }
