import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, NavigationExtras, Router} from '@angular/router';
import {FormControl} from '@angular/forms';
import {MerchantData} from '../rebates.types';
import {CurrencyPipe} from '@angular/common';

@Component({
  selector: 'perx-blackcomb-pages-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  private rebatesData?: MerchantData[];
  public matchingMerchant: MerchantData | undefined;
  public rebateGained: number;
  public transactionAmount: number = 0;
  public costControl: FormControl = new FormControl(null);
  constructor(
    private route: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
    private router: Router
  ) {
    this.costControl.valueChanges.subscribe(
      (currValue) => {
        this.rebateGained = Math.round(currValue * 0.1);
      }
    );
  }

  public ngOnInit(): void {
    let merchantRebateId;
    this.route.params.subscribe((routeData) => {
      merchantRebateId = routeData.id;
    });
    this.rebatesData = JSON.parse(localStorage.getItem('merchantsRebates') as string);
    this.matchingMerchant = this.rebatesData ?
      this.rebatesData.find(data => data.merchantId === parseInt(merchantRebateId, 10)) : undefined;
    // console.log(this.matchingMerchant, 'matched merchant');
  }

  public validateMatchingMerchant(obj: any): obj is MerchantData {
    return 'merchantId' in obj;
  }

  public cancelTransaction(): void {
    this.router.navigate(['rebates/transaction']);
  }

  public confirmTransaction(): void {
    let rebateBurned;
    // deduct rebate and credit rebate, for now just use up all
    if (this.rebatesData && this.matchingMerchant) {
      this.rebatesData = this.rebatesData.map(merchant => {
        if (this.validateMatchingMerchant(this.matchingMerchant) && merchant.merchantId === this.matchingMerchant.merchantId) {
          rebateBurned = merchant.rebateAmount;
          return {
            ...merchant,
            rebateAmount: `${this.currencyPipe.transform(this.rebateGained, '$')}`
          };
        }
        return merchant;
      });
    }
    localStorage.setItem('merchantsRebates', JSON.stringify(this.rebatesData));
    // navigate to success - think about when will fail, just to display success/failure? not useful, combine
    // wont have failure cause not api, just go to success page, pass down info required
    const navigationExtras: NavigationExtras = {
      state: {
        rebateGained: `${this.currencyPipe.transform(this.rebateGained, '$')}`,
        transactionAmount: `$${this.transactionAmount}`,
        rebateBurned: rebateBurned ? rebateBurned : '$0.00',
        name: this.matchingMerchant ? this.matchingMerchant.name : '',
        logo: this.matchingMerchant ? this.matchingMerchant.logo : ''
      }
    };
    this.router.navigate(['rebates/complete'], navigationExtras);
  }
}
