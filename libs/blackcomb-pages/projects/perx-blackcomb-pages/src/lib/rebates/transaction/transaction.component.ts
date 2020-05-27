import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'perx-blackcomb-pages-transaction',
  templateUrl: './transaction.component.html',
  styleUrls: ['./transaction.component.scss']
})
export class TransactionComponent implements OnInit {
  private rebatesData: any;
  public matchingMerchant: any;
  public rebateGained: number;
  public costControl: FormControl = new FormControl(null);
  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.costControl.valueChanges.subscribe(
      (currValue) => this.rebateGained = Math.round(currValue * 0.1)
    );
  }

  public ngOnInit(): void {
    let merchantRebateId;
    this.route.params.subscribe((routeData) => {
      merchantRebateId = routeData.id;
    });
    this.rebatesData = JSON.parse(localStorage.getItem('merchantsRebates') as string);
    this.matchingMerchant = this.rebatesData ?
      this.rebatesData.find(data => data.merchantId === parseInt(merchantRebateId, 10)) : null;
    // console.log(this.matchingMerchant, 'matched merchant');
  }

  public confirmTransaction(): void {
    // deduct rebate and credit rebate, for now just use up all
    this.rebatesData = this.rebatesData.map(merchant => {
      if (merchant.merchantId === this.matchingMerchant.merchantId) {
        return {
          ...merchant,
          rebateAmount: this.rebateGained
        };
      }
      return merchant;
    });
    localStorage.setItem('merchantsRebates', JSON.stringify(this.rebatesData));
    // navigate to success - think about when will fail, just to display success/failure? not useful, combine
    // wont have failure cause not api, just go back to waller
    this.router.navigate(['rebates']);
  }

}
