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
  transactions: Observable<ITransaction[]>;

  @Output()
  tapped: EventEmitter<ITransaction> = new EventEmitter<ITransaction>();

  constructor() {
  }

  ngOnInit() {
  }

}
