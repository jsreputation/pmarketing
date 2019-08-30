import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ITransaction} from '../models/loyalty.model';
import { DatePipe } from '@angular/common';
import { TransactionPipe } from './transaction.pipe';

@Component({
  selector: 'perx-core-loyalty-transactions-list',
  templateUrl: './loyalty-transactions-list.component.html',
  styleUrls: ['./loyalty-transactions-list.component.scss']
})
export class LoyaltyTransactionsListComponent implements OnInit {
  @Input('transactions')
  public transactions$: Observable<ITransaction[]>;

  @Output()
  public tapped: EventEmitter<ITransaction> = new EventEmitter<ITransaction>();

  @Input()
  public titleFn: (tr: ITransaction) => string;

  @Input()
  public subTitleFn: (tr: ITransaction) => string;

  @Input()
  public priceLabelFn: (tr: ITransaction) => string;

  constructor( private datePipe: DatePipe,
               private transactionPipe: TransactionPipe
  ) {
  }

  public ngOnInit(): void {
    if (!this.titleFn) {
      this.titleFn = (tr: ITransaction) => {
        return `${tr.name}`;
      };
    }
    if (!this.subTitleFn) {
      this.subTitleFn = (tr: ITransaction) => {
        return `${this.datePipe.transform(tr.earnedDate, 'dd/MM/yyyy')}`;
      };
    }
    if (!this.priceLabelFn) {
      this.priceLabelFn = (tr: ITransaction) => {
        return `${this.transactionPipe.transform(tr.points)}`;
      };
    }
  }
}
