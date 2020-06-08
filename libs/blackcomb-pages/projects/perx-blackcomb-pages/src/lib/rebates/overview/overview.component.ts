import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {MerchantData} from '../rebates.types';

@Component({
  selector: 'perx-blackcomb-pages-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public matchingMerchant: MerchantData;
  public merchantPrice?: string;
  public constructor(
    private router: Router
  ) {}
  public ngOnInit(): void {
    const scannedRebateData = history.state.merchantRebateData;
    const merchantRebate = JSON.parse(scannedRebateData);
    // find and update
    this.merchantPrice = merchantRebate.price;
    console.log(this.merchantPrice, 'this is the rebate price');
    const {price, ...otherMerchantProperties} = merchantRebate;
    console.log(otherMerchantProperties, 'what am i???');
    const rebatesData = JSON.parse(localStorage.getItem('merchantsRebates') as string);
    this.matchingMerchant = rebatesData ? rebatesData.find(data => data.merchantId === merchantRebate.merchantId) : null;
    if (this.matchingMerchant === undefined) {
      // null if localStorage empty, undefined when cant find in localStorage
      // save particular merchant before continuing
      localStorage.setItem('merchantsRebates', JSON.stringify([...rebatesData, otherMerchantProperties]));
      this.matchingMerchant = merchantRebate;
    }
  }
  public transaction(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        price: this.merchantPrice
      }
    };
    // navigate to transaction page will do reduction full amt of rebate avail
    this.router.navigate(['rebates/transaction', this.matchingMerchant.merchantId], navigationExtras);
  }

  public doNothing(): void {
    console.info('Feature not implemented');
  }
}
