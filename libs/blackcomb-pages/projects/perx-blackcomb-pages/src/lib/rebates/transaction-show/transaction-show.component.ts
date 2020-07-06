import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { TransactionReceipt } from '../rebates.types';

@Component({
  selector: 'perx-blackcomb-pages-transaction-show',
  templateUrl: './transaction-show.component.html',
  styleUrls: ['./transaction-show.component.scss']
})
export class TransactionShowComponent implements OnInit {
  public transactionObject: TransactionReceipt;
  constructor(
    private router: Router,
    private datePipe: DatePipe
  ) {}

  public ngOnInit(): void {
    this.transactionObject = history.state || {};
    // @ts-ignore
    this.transactionObject.dateNow = this.datePipe.transform(Date.now(), 'dd/MM/yyyy, hh:mm');
  }

  public goHome(): void {
    this.router.navigate(['rebates']);
  }

  public goReceipt(): void {
    this.router.navigate(['rebates/complete'], {state: this.transactionObject});
  }
}
