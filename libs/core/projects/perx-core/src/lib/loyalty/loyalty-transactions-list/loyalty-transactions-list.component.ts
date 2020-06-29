import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ILoyaltyTransaction } from '../models/loyalty.model';
import { DatePipe } from '@angular/common';
import { TransactionPipe } from './transaction.pipe';

@Component({
  selector: 'perx-core-loyalty-transactions-list',
  templateUrl: './loyalty-transactions-list.component.html',
  styleUrls: ['./loyalty-transactions-list.component.scss']
})
export class LoyaltyTransactionsListComponent implements OnInit {
  @Input('transactions') // needs flexibility to be of type Observable<ILoyaltyTransaction[]> | Observable<IMerchantAdminTransaction[]>
  public transactions$: Observable<ILoyaltyTransaction[]>;
  public transactions: ILoyaltyTransaction[];

  @Output()
  public tapped: EventEmitter<ILoyaltyTransaction> = new EventEmitter<ILoyaltyTransaction>();

  @Input()
  public titleFn: (tr: ILoyaltyTransaction) => string;

  @Input()
  public skuFn: (tr: ILoyaltyTransaction) => ({
    sku: string | undefined;
    qty: string | undefined,
    untprc: string | undefined;
  });

  @Input()
  public descFn: (tr: ILoyaltyTransaction) => string;

  @Input()
  public subTitleFn: (tr: ILoyaltyTransaction) => string;

  @Input()
  public priceLabelFn: (tr: ILoyaltyTransaction) => string;

  constructor(
    private datePipe: DatePipe,
    private transactionPipe: TransactionPipe
  ) {
  }

  public ngOnInit(): void {
    if (this.transactions$) {
      this.transactions$.subscribe(
        (transactions: ILoyaltyTransaction[]) => {
          this.transactions = transactions;
        },
        () => console.error('No transactions loaded to loyalty transactions list')
      );
    }
    if (!this.titleFn) {
      this.titleFn = (tr: ILoyaltyTransaction) => `${tr.name}`;
    }
    if (!this.skuFn) {
      this.skuFn = (tr: ILoyaltyTransaction) => ({
        sku: tr.sku ? `sku${tr.sku}` : undefined,
        qty: tr.quantity ? (parseInt(tr.quantity, 10) > 1 ? `${tr.quantity} items` : `${tr.quantity} item`) : undefined,
        untprc: tr.purchaseAmount || undefined
      });
    }
    if (!this.descFn) {
      this.descFn = () => '';
    }
    if (!this.subTitleFn) {
      this.subTitleFn = (tr: ILoyaltyTransaction) => `${this.datePipe.transform(tr.earnedDate, 'shortDate')}`;
    }
    if (!this.priceLabelFn) {
      this.priceLabelFn = (tr: ILoyaltyTransaction) => `${this.transactionPipe.transform(tr.points)}`;
    }
  }
}
