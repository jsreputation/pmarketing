import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ITransaction } from '../models/loyalty.model';
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
  public skuFn: (tr: ITransaction) => ({
    sku: string | undefined;
    qty: string | undefined,
    untprc: string | undefined;
  });

  @Input()
  public descFn: (tr: ITransaction) => string;

  @Input()
  public subTitleFn: (tr: ITransaction) => string;

  @Input()
  public priceLabelFn: (tr: ITransaction) => string;

  constructor(
    private datePipe: DatePipe,
    private transactionPipe: TransactionPipe
  ) {
  }

  public ngOnInit(): void {
    if (!this.titleFn) {
      this.titleFn = (tr: ITransaction) => `${tr.name}`;
    }
    if (!this.skuFn) {
      this.skuFn = (tr: ITransaction) => ({
        sku: tr.sku ? `sku${tr.sku}` : '',
        qty: tr.quantity ? parseInt(tr.quantity) > 1 ? `${tr.quantity} items` : `${tr.quantity} item` : undefined,
        untprc: tr.purchaseAmount
      });
    }
    if (!this.descFn) {
      this.descFn = () => '';
    }
    if (!this.subTitleFn) {
      this.subTitleFn = (tr: ITransaction) => `${this.datePipe.transform(tr.earnedDate, 'shortDate')}`;
    }
    if (!this.priceLabelFn) {
      this.priceLabelFn = (tr: ITransaction) => `${this.transactionPipe.transform(tr.points)}`;
    }
  }
}
