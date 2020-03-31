import { Pipe, PipeTransform } from '@angular/core';
import { ITransactionHistory, TransactionDetailType } from '@perxtech/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'transactionHistory'
})
export class TransactionHistoryPipe implements PipeTransform {

  public transform(allTransanctions: Observable<ITransactionHistory[]>, isPurchase?: boolean): Observable<ITransactionHistory[]> {

    return allTransanctions.pipe(
      map((transactions: ITransactionHistory[]) => transactions.filter(
        (transaction: ITransactionHistory) => transaction.transactionDetails ? isPurchase ?
          (transaction.transactionDetails.type === TransactionDetailType.transaction) :
          (transaction.transactionDetails.type === TransactionDetailType.reward) : null))
    );
  }
}
