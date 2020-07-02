import { Pipe, PipeTransform } from '@angular/core';
import { ILoyaltyTransaction } from '@perxtech/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'transaction'
})
export class TransactionPipe implements PipeTransform {

  public transform(
    allTransanctions: Observable<ILoyaltyTransaction[]>,
    isPurchase?: boolean
  ): Observable<ILoyaltyTransaction[]> {

    return allTransanctions.pipe(
      map((transactions) => transactions.filter((transaction) => isPurchase ? (transaction.points < 0) : (transaction.points > 0)))
    );
  }
}
