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
  public rebateGained: number = 0;
  public consumedRebates: number = 0;
  public transactionAmount: number = 0;
  public costControl: FormControl = new FormControl(null);
  constructor(
    private route: ActivatedRoute,
    private currencyPipe: CurrencyPipe,
    private router: Router
  ) {
    this.costControl.valueChanges.subscribe(
      (currValue) => {
        if (this.matchingMerchant) {
          const parsedRebateAmount = TransactionComponent.convertStringCurrencyToFloat(this.matchingMerchant.rebateAmount);
          if (parsedRebateAmount >= currValue) {
            this.consumedRebates = currValue;
          } else if (parsedRebateAmount > 0) {
            this.consumedRebates = parsedRebateAmount;
          } else {
            this.consumedRebates = 0.00;
          }
          this.rebateGained = parseFloat(((currValue - this.consumedRebates) / 10 ).toFixed(2)); // get rebate base on actual charge
        }
      }
    );
  }

  public static convertStringCurrencyToFloat(currencyFormattedAmount: string): number {
    return parseFloat(currencyFormattedAmount.slice(1)) ;
  }

  public ngOnInit(): void {
    let merchantRebateId;
    this.route.params.subscribe((routeData) => {
      merchantRebateId = routeData.id;
    });
    this.rebatesData = JSON.parse(localStorage.getItem('merchantsRebates') as string);
    this.matchingMerchant = this.rebatesData ?
      this.rebatesData.find(data => data.merchantId === parseInt(merchantRebateId, 10)) : undefined;
    if (this.matchingMerchant && this.matchingMerchant.price) {
      this.transactionAmount = TransactionComponent.convertStringCurrencyToFloat(this.matchingMerchant.price);
      this.costControl.disable();
    }
  }

  public validateMatchingMerchant(obj: any): obj is MerchantData {
    return 'merchantId' in obj;
  }

  public cancelTransaction(): void {
    this.router.navigate(['rebates/transaction']);
  }

  public confirmTransaction(): void {
    // deduct rebate and credit rebate
    if (this.rebatesData && this.matchingMerchant) {
      this.rebatesData = this.rebatesData.map(merchant => {
        if (this.validateMatchingMerchant(this.matchingMerchant) && merchant.merchantId === this.matchingMerchant.merchantId) {
          let rebateAmount = TransactionComponent.convertStringCurrencyToFloat(merchant.rebateAmount);
          if (this.consumedRebates) {
            rebateAmount -= this.consumedRebates; // consume rebate
          }
          rebateAmount += this.rebateGained;
          return {
            ...merchant,
            rebateAmount: `${this.currencyPipe.transform(
              rebateAmount,
              '$')}`
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
        rebateGained: this.currencyPipe.transform(this.rebateGained, '$'),
        actualCharged: this.currencyPipe.transform(
          this.consumedRebates ?
            this.transactionAmount - this.consumedRebates :
            this.transactionAmount, '$'),
        transactionAmount: this.currencyPipe.transform(this.transactionAmount, '$'),
        rebateBurned: this.currencyPipe.transform(this.consumedRebates, '$'),
        name: this.matchingMerchant ? this.matchingMerchant.name : '',
        logo: this.matchingMerchant ? this.matchingMerchant.logo : ''
      }
    };
    this.router.navigate(['rebates/show'], navigationExtras);
  }
}
