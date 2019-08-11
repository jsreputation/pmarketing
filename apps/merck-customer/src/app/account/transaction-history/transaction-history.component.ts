import { Component, OnInit } from '@angular/core';
import { BarSelectedItem } from 'src/app/page-properties';

@Component({
  selector: 'mc-transaction-history',
  templateUrl: './transaction-history.component.html',
  styleUrls: ['./transaction-history.component.scss']
})
export class TransactionHistoryComponent implements OnInit {

  public ngOnInit(): void {
  }

  public showHeader(): boolean {
    return false;
  }

  public backButtonEnabled(): boolean {
    return true;
  }

  public bottomSelectedItem(): BarSelectedItem {
    return BarSelectedItem.ACCOUNT;
  }

}
