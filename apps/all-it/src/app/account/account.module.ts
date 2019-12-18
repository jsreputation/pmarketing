import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UtilsModule } from '@perx/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountComponent } from '@perx/blackcomb-pages';
import { MatCardModule, MatListModule } from '@angular/material';

const routes: Routes = [{
  path: '',
  component: AccountComponent
}];

@NgModule({
  declarations: [AccountComponent],
  imports: [
    CommonModule,
    UtilsModule,
    MatListModule,
    MatCardModule,
    RouterModule.forChild(routes)
  ]
})
export class AccountModule { }
