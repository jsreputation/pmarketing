import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Observable } from 'rxjs';

interface ITransaction {
  id: number;
}

@Component({
  selector: 'perx-core-loyalty-transaction-history',
  templateUrl: './loyalty-transaction-history.component.html',
  styleUrls: ['./loyalty-transaction-history.component.scss']
})
export class LoyaltyTransactionHistoryComponent implements OnInit {
  @Input()
  public transactions: Observable<ITransaction[]>;

  @Output()
  public tapped: EventEmitter<ITransaction> = new EventEmitter<ITransaction>();

  // constructor() {
  // }

  public ngOnInit() {
  }

}
