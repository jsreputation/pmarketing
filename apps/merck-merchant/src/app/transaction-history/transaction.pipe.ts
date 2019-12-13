import { Pipe, PipeTransform } from '@angular/core';
import { ITransaction } from '@perx/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'transaction'
})
export class TransactionPipe implements PipeTransform {

  public transform(allTransanctions: Observable<ITransaction[]>, isPurchase?: boolean): Observable<ITransaction[]> {

      return allTransanctions.pipe(
          map((transactions) => transactions.filter((transaction) => {
            return isPurchase ? (transaction.points < 0) : (transaction.points > 0);
          }))
      );
  }
}
