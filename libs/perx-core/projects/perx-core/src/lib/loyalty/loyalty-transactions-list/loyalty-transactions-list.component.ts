import {
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { Observable } from 'rxjs';
import { ITransaction } from '../models/loyalty.model';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'perx-core-loyalty-transactions-list',
  templateUrl: './loyalty-transactions-list.component.html',
  styleUrls: ['./loyalty-transactions-list.component.scss']
})
export class LoyaltyTransactionsListComponent {
  @Input('transactions')
  public transactions$: Observable<ITransaction[]>;

  @Output()
  public tapped: EventEmitter<ITransaction> = new EventEmitter<ITransaction>();

  @Output()
  public scrollEnd: EventEmitter<boolean> = new EventEmitter<boolean>();

  @ViewChild(CdkVirtualScrollViewport, {static: false})
  private viewport: CdkVirtualScrollViewport;

  public onScrolledIndexChange(): void {
    const end = this.viewport.getRenderedRange().end;
    const total = this.viewport.getDataLength();
    if (total === end) {
      this.scrollEnd.emit(true);
    }
  }

  public trackById(_: number, transaction: ITransaction): number {
    return transaction.id;
  }
}
