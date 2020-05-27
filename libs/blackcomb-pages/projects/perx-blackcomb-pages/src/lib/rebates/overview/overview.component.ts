import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'perx-blackcomb-pages-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss']
})
export class OverviewComponent implements OnInit {
  public matchingMerchant: any;
  public constructor(
    private router: Router
  ) {}
  public ngOnInit(): void {
    const scannedRebateData = history.state.merchantRebateData;
    const merchantRebateId = JSON.parse(scannedRebateData).merchantId;
    // console.log(merchantRebateId, ' my id');
    const rebatesData = JSON.parse(localStorage.getItem('merchantsRebates') as string);
    // should i match by id or name?
    this.matchingMerchant = rebatesData ? rebatesData.find(data => data.merchantId === merchantRebateId) : null;
  }
  public transaction(): void {
    // navigate to transaction page will do reduction full amt of rebate avail
    this.router.navigate(['rebates/transaction', this.matchingMerchant.merchantId]);
  }
}
