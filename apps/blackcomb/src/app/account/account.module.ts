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

import { UtilsModule } from '@perx/core';
import { AccountComponent } from '@perx/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: AccountComponent
}];

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    UtilsModule,
    MatCardModule,
    MatListModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }
