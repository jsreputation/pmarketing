import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable, of } from 'rxjs';
import { ITransaction } from '../models/loyalty.model';
import { DatePipe } from '@angular/common';
import { TransactionPipe } from './transaction.pipe';

@Component({
  selector: 'perx-core-loyalty-transactions-list',
  templateUrl: './loyalty-transactions-list.component.html',
  styleUrls: ['./loyalty-transactions-list.component.scss']
})
export class LoyaltyTransactionsListComponent implements OnInit {
  @Input('transactions') // needs flexibility to be of type Observable<ITransaction[]> | Observable<IMerchantAdminTransaction[]>
  public transactions$: Observable<ITransaction[]>;
  public transactions: ITransaction[];

  @Output()
  public tapped: EventEmitter<ITransaction> = new EventEmitter<ITransaction>();

  @Input()
  public titleFn: (tr: ITransaction) => Observable<string>;

  @Input()
  public skuFn: (tr: ITransaction) => Observable<{
    sku: string | undefined;
    qty: string | undefined,
    untprc: string | undefined;
  }>;

  @Input()
  public descFn: (tr: ITransaction) => Observable<string>;

  @Input()
  public subTitleFn: (tr: ITransaction) => Observable<string>;

  @Input()
  public priceLabelFn: (tr: ITransaction) => Observable<string>;

  constructor(
    private datePipe: DatePipe,
    private transactionPipe: TransactionPipe
  ) {
  }

  public ngOnInit(): void {
    if (this.transactions$) {
      this.transactions$.subscribe(
        (transactions: ITransaction[]) => {
          this.transactions = transactions;
        },
        () => console.error('No transactions loaded to loyalty transactions list')
      );
    }
    if (!this.titleFn) {
      this.titleFn = (tr: ITransaction) => of(`${tr.name}`);
    }
    if (!this.skuFn) {
      this.skuFn = (tr: ITransaction) => of({
        sku: tr.sku ? `sku${tr.sku}` : undefined,
        qty: tr.quantity ? (parseInt(tr.quantity, 10) > 1 ? `${tr.quantity} items` : `${tr.quantity} item`) : undefined,
        untprc: tr.purchaseAmount || undefined
      });
    }
    if (!this.descFn) {
      this.descFn = () => of('');
    }
    if (!this.subTitleFn) {
      this.subTitleFn = (tr: ITransaction) => of(`${this.datePipe.transform(tr.earnedDate, 'shortDate')}`);
    }
    if (!this.priceLabelFn) {
      this.priceLabelFn = (tr: ITransaction) => of(`${this.transactionPipe.transform(tr.points)}`);
    }
  }
}
