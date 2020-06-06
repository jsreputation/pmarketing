import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {MerchantData} from '../rebates.types';

@Component({
  selector: 'perx-blackcomb-pages-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public matchingMerchant: MerchantData;
  public constructor(
    private router: Router
  ) {}
  public ngOnInit(): void {
    const scannedRebateData = history.state.merchantRebateData;
    const merchantRebate = JSON.parse(scannedRebateData);
    // console.log(merchantRebateId, ' my id');
    const rebatesData = JSON.parse(localStorage.getItem('merchantsRebates') as string);
    // should i match by id or name?
    this.matchingMerchant = rebatesData ? rebatesData.find(data => data.merchantId === merchantRebate.merchantId) : null;
    if (this.matchingMerchant === undefined) {
      // null if localStorage empty, undefined when cant find in localStorage
      // save particular merchant before continuing
      localStorage.setItem('merchantsRebates', JSON.stringify([...rebatesData, merchantRebate]));
      this.matchingMerchant = merchantRebate;
    }
  }
  public transaction(): void {
    // navigate to transaction page will do reduction full amt of rebate avail
    this.router.navigate(['rebates/transaction', this.matchingMerchant.merchantId]);
  }

  public doNothing(): void {
    console.info('Feature not implemented');
  }
}
