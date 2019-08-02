import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { REDEMPTION_TYPE } from '@perx/core';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit {
  public gameId: number;
  public redeemType: REDEMPTION_TYPE; // 'pin' || 'bcode' || 'qrcode'

  public voucherId: number = 2646396;

  public encodedValue: string = 'Encoded voucher Id';  // TODO: To be replaced with Value to be encoded

  public hasResultFetched: boolean = false;
  public isRedeemSuccessful: boolean = false;

  constructor(private route: ActivatedRoute) { }

  public ngOnInit(): void {
    this.route.paramMap.subscribe((params: ParamMap) => {
      this.gameId = Number.parseInt(params.get('id'), 10);
      this.redeemType = params.get('mode') as REDEMPTION_TYPE;
    });
  }

  public pinInput(id: string): void {
    console.log(`Pin input ${id}`);
  }

  public onCancel(): void {
    this.hasResultFetched = true;
    this.isRedeemSuccessful = true;
  }

  public errorHandler(status: number): void {
    console.log(`Error status: ${status}`);
  }

  public get titleText(): string {
    if (this.isRedeemSuccessful) {
      return 'Successfully Redeemed!';
    }
    return 'Redemption Unsucessful';
  }

  public get subTitleText(): string {
    if (this.isRedeemSuccessful) {
      return `You have redeemed $3 voucher from Starbucks`;
    }
    return `Please ensure the code entered is correct`;
  }

  public get bottomButtonText(): string {
    if (this.isRedeemSuccessful) {
      return `Back to wallet`;
    }
    return `Redeem`;
  }
}
