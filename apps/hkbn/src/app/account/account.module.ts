import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './containers/account/account.component';
import { AccountSummaryComponent } from './components/account-summary/account-summary.component';

@NgModule({
  declarations: [AccountComponent, AccountSummaryComponent],
  imports: [
    CommonModule
  ]
})
export class AccountModule { }
