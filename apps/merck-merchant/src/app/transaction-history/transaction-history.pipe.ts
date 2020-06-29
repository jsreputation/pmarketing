import { Pipe, PipeTransform } from '@angular/core';
import { ILoyaltyTransactionHistory, TransactionDetailType } from '@perxtech/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'transactionHistory'
})
export class TransactionHistoryPipe implements PipeTransform {

  public transform(allTransanctions: Observable<ILoyaltyTransactionHistory[]>, isPurchase?: boolean): Observable<ILoyaltyTransactionHistory[]> {

    return allTransanctions.pipe(
      map((transactions: ILoyaltyTransactionHistory[]) => transactions.filter(
        (transaction: ILoyaltyTransactionHistory) => transaction.transactionDetails ? isPurchase ?
          (transaction.transactionDetails.type === TransactionDetailType.transaction) :
          (transaction.transactionDetails.type === TransactionDetailType.reward) : null))
    );
  }
}
