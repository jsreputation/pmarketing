import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '@perxtech/core';
import { RouterModule, Routes } from '@angular/router';
import {
  AccountComponent,
  PerxBlackcombPagesModule
} from '@perxtech/blackcomb-pages';
import { MatCardModule, MatListModule } from '@angular/material';

const routes: Routes = [{
  path: '',
  component: AccountComponent
}];

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    MatListModule,
    MatCardModule,
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }
