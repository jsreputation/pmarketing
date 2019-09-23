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

  @Output()
  public scrolled: EventEmitter<void> = new EventEmitter<void>();

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
      this.titleFn = (tr: ITransaction) => `${tr.name}`;
    }
    if (!this.subTitleFn) {
      this.subTitleFn = (tr: ITransaction) => `${this.datePipe.transform(tr.earnedDate, 'dd/MM/yyyy')}`;
    }
    if (!this.priceLabelFn) {
      this.priceLabelFn = (tr: ITransaction) => `${this.transactionPipe.transform(tr.points)}`;
    }
  }

  onScroll() {
    console.log('scrolled!!');
    this.scrolled.emit();
  }
}
