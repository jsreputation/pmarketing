import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { TransactionReceipt } from '../rebates.types';

@Component({
  selector: 'perx-blackcomb-pages-transaction-complete',
  templateUrl: './transaction-complete.component.html',
  styleUrls: ['./transaction-complete.component.scss']
})
export class TransactionCompleteComponent implements OnInit {
  constructor(
    private router: Router
  ) {}

  public transactionObject: TransactionReceipt;
  public ngOnInit(): void {
    this.transactionObject = history.state;
  }

  public backHome(): void {
    this.router.navigate(['rebates']);
  }

}
