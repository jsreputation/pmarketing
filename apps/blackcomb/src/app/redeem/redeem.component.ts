import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Voucher, VouchersService } from '@perx/core';
import { Observable } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit {
  public voucher: Observable<Voucher>;
  constructor(private route: ActivatedRoute, private vouchersService: VouchersService) { }

  public ngOnInit(): void {
    this.voucher = this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        switchMap((params: ParamMap) => {
          const id: string = params.get('id');
          const idN: number = Number.parseInt(id, 10);
          return this.vouchersService.get(idN);
        })
      );
  }

  public pinInput(id: string): void {
    console.log(`Pin input ${id}`);
  }

  public onCancel(): void {
    // this.hasResultFetched = true;
    // this.isRedeemSuccessful = true;
  }

  public errorHandler(status: number): void {
    console.log(`Error status: ${status}`);
  }

  public get titleText(): string {
    // if (this.isRedeemSuccessful) {
    //   return 'Successfully Redeemed!';
    // }
    return 'Redemption Unsucessful';
  }

  public get subTitleText(): string {
    // if (this.isRedeemSuccessful) {
    //   return `You have redeemed $3 voucher from Starbucks`;
    // }
    return `Please ensure the code entered is correct`;
  }

  public get bottomButtonText(): string {
    // if (this.isRedeemSuccessful) {
    //   return `Back to wallet`;
    // }
    return `Redeem`;
  }
}
