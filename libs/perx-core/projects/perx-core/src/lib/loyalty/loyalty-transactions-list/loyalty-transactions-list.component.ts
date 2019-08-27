import {
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { Observable } from 'rxjs';
import { ITransaction } from '../models/loyalty.model';

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
}
