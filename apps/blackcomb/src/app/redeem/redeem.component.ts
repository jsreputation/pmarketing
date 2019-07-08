import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit {

  gameId: number;
  redeemType: string; // 'pin' || 'bcode' || 'qrcode'

  voucherId = 2646396;

  encodedValue = 'Encoded voucher Id';  // TODO: To be replaced with Value to be encoded

  hasResultFetched = false;
  isRedeemSuccessful = false;

  constructor(private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.gameId = Number.parseInt(params.get('id'), 10);
      this.redeemType =  params.get('mode');
    });
  }

  pinInput(id: string) {
    console.log(`Pin input ${id}`);
  }

  onCancel() {
    this.hasResultFetched = true;
    this.isRedeemSuccessful = true;
  }

  errorHandler(status: number) {
    console.log(`Error status: ${status}`);
  }
  needLoginPopup(): void {
    console.log('Need to login');
  }

  errorPopup(): void {
  }

  getTitleText(): string {
    if (this.isRedeemSuccessful) {
      return 'Successfully Redeemed!';
    } else {
      return 'Redemption Unsucessful';
    }
  }

  getSubTitleText(): string {

    if (this.isRedeemSuccessful) {
      return `You have redeemed $3 voucher from Starbucks`;
    } else {
      return `Please ensure the code entered is correct`;
    }
  }

  getBottomButtonText(): string {
    if (this.isRedeemSuccessful) {
      return `Back to wallet`;
    } else {
      return `Redeem`;
    }
  }

}
