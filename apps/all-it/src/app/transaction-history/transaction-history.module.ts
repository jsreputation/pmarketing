import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionHistoryComponent } from '@perx/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

const routes: Routes = [{
  path: '',
  component: TransactionHistoryComponent
}];

@NgModule({
  declarations: [
    TransactionHistoryComponent
  ],
  imports: [
    MatButtonModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class TransactionHistoryModule { }
