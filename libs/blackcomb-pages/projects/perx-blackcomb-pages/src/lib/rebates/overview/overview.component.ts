import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import {
  ILoyalty,
  LoyaltyService
} from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public matchingMerchant: ILoyalty;
  public merchantPrice?: string;
  public constructor(
    private router: Router,
    private loyaltyService: LoyaltyService
  ) {}
  public ngOnInit(): void {
    const scannedRebateData = history.state.merchantRebateData;
    const merchantJsonData = JSON.parse(scannedRebateData);
    // find and update
    // const {price, ...otherMerchantProperties} = merchantJsonData;
    // const rebatesData = JSON.parse(localStorage.getItem('merchantsRebates') as string);
    // this.matchingMerchant = rebatesData ? rebatesData.find(data => data.merchantId === merchantJsonData.merchantId) : null;
    // if (this.matchingMerchant === undefined) {
    //   // null if localStorage empty, undefined when cant find in localStorage
    //   // save particular merchant before continuing
    //   localStorage.setItem('merchantsRebates', JSON.stringify([...rebatesData, otherMerchantProperties]));
    //   this.matchingMerchant = merchantJsonData;
    // }

    this.loyaltyService.getLoyalty(merchantJsonData.id).subscribe(
      (merchant: ILoyalty) => {
        this.matchingMerchant = merchant;
        this.merchantPrice = merchantJsonData.price;
      },
      () => {
        console.log('unrecognised QR');
      }
    );
  }
  public transaction(): void {
    const navigationExtras: NavigationExtras = {
      state: {
        price: this.merchantPrice
      }
    };
    // navigate to transaction page will do reduction full amt of rebate avail
    this.router.navigate(['rebates/transaction', this.matchingMerchant.id], navigationExtras);
  }

  public doNothing(): void {
    console.info('Feature not implemented');
  }
}
