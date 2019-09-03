import { Component, OnInit, ViewChild } from '@angular/core';
import { Voucher, VoucherState, VouchersService, PinRedemptionComponent } from '@perx/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, map, switchMap } from 'rxjs/operators';
import { Location } from '@angular/common';

@Component({
  selector: 'app-redemption',
  templateUrl: './redemption.component.html',
  styleUrls: ['./redemption.component.scss']
})
export class RedemptionComponent implements OnInit {

  public voucher: Voucher;
  public showEnterPinComponent: boolean = false;
  public isPinEntered: boolean = false;
  public isPinCorrect: boolean;

 @ViewChild('pinInput', {static: false})
  private pinInputComponent: PinRedemptionComponent;

  constructor(
    private vouchersService: VouchersService,
    private activeRoute: ActivatedRoute,
    private location: Location,
    private router: Router) {
  }

  public ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.id ? true : false),
        map((params: Params) => params.id),
        switchMap((id: number) => this.vouchersService.get(id))
      )
      .subscribe((voucher: Voucher) => {
        this.voucher = voucher;
      });
  }

  public back(): void {
    this.location.back();
  }

  public showPinComponent(): void {
    this.showEnterPinComponent = true;
  }

  public onVoucherRedeemed(): void {
    this.isPinEntered = true;
    this.voucher.state = VoucherState.redeemed;
  }

  public onUpdate(): void {
    if (this.pinInputComponent.hasError === 'error') {
      this.isPinCorrect = false;
      this.isPinEntered = true;
    }
  }

  public tryAgainClicked(): void {
    this.isPinEntered = false;
    this.pinInputComponent.resetAll();
  }

  public cancelClicked(): void {
    this.location.back();
  }

  public backMyRewardsClicked(): void {
    this.router.navigateByUrl('home/vouchers');
  }

  public copyCode(inputElement: HTMLInputElement): void {
    inputElement.select();
    document.execCommand('copy');
  }

}
