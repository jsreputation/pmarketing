import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  Voucher,
  IVoucherService,
  RedemptionType,
  IPopupConfig,
  PopupComponent,
} from '@perx/core';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil, map, tap } from 'rxjs/operators';
import { MatDialog, MatDialogRef } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-blackcomb-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit, OnDestroy {
  public voucher$: Observable<Voucher>;
  public voucherId: number;
  public redemptionType: RedemptionType;
  private destroy$: Subject<void> = new Subject<void>();
  public rt: typeof RedemptionType = RedemptionType;
  public headLine: string;
  public subHeadLine: string;
  public rewardSuccessPopUp: IPopupConfig = {
    title: 'Successfully Redeemed!',
    text: '',
  };
  public codeInstructionsText: string = `Please input this code when redeeming your reward at the Merchant`;
  public errorPopUp: IPopupConfig = {
    title: 'Error occur, please try again later',
    imageUrl: '',
  };

  private initTranslate(): void {
    this.translate.get('ENTER_CODE').subscribe((text) => this.headLine = text);
    this.translate.get('REDEMPTION_CODE').subscribe((text) => this.subHeadLine = text);
    this.translate.get('REDEEM_SUCCESSFULLY').subscribe((text) => this.rewardSuccessPopUp.title = text);
    this.translate.get('TRY_AGAIN_LATER').subscribe((text) => this.errorPopUp.title = text);
  }

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private vouchersService: IVoucherService,
    private dialog: MatDialog,
    private router: Router,
    private translate: TranslateService
  ) {
  }

  public ngOnInit(): void {
    this.initTranslate();
    this.voucher$ = this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        map((params: ParamMap) => Number.parseInt(params.get('id'), 10)),
        tap((id: number) => this.voucherId = id),
        switchMap((id: number) => this.vouchersService.get(id)),
        tap((voucher: Voucher) => {
          this.rewardSuccessPopUp.text = `You have redeemed ${voucher.reward.name}`;
          this.redemptionType = voucher.reward.redemptionType;
          if (voucher.reward.displayProperties && voucher.reward.displayProperties.merchantPinText) {
            this.headLine = voucher.reward.displayProperties.merchantPinText.headLine || this.headLine;
            this.subHeadLine = voucher.reward.displayProperties.merchantPinText.subHeadLine || this.subHeadLine;
          }

          if (voucher.reward.displayProperties && voucher.reward.displayProperties.rewardSuccessPopUp) {
            this.rewardSuccessPopUp.title = voucher.reward.displayProperties.rewardSuccessPopUp.headLine;
            this.rewardSuccessPopUp.text = voucher.reward.displayProperties.rewardSuccessPopUp.subHeadLine || this.rewardSuccessPopUp.text;
            this.rewardSuccessPopUp.imageUrl = voucher.reward.displayProperties.rewardSuccessPopUp.imageURL;
          }

          if (voucher.reward.displayProperties && voucher.reward.displayProperties.codeInstructionsText) {
            this.codeInstructionsText = voucher.reward.displayProperties.codeInstructionsText.headLine;
          }

          if (voucher.reward.displayProperties && voucher.reward.displayProperties.errorPopUp) {
            this.errorPopUp.title = voucher.reward.displayProperties.errorPopUp.headLine;
            this.errorPopUp.imageUrl = voucher.reward.displayProperties.errorPopUp.imageURL;
          }
        }),
        takeUntil(this.destroy$)
      );

  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public pinInputSuccess(): void {
    this.popup(this.rewardSuccessPopUp);
  }

  public errorHandler(status: number): void {
    if (status === 401) {
      this.needLoginPopup();
    } else {
      this.errorPopup();
    }
  }

  public needLoginPopup(): void {
    this.translate.get(['REEDEM_QUEST', 'GO_TO_LOGIN']).pipe(map((dictionary) => this.popup({
      title: dictionary.REEDEM_QUEST,
      buttonTxt: dictionary.GO_TO_LOGIN
    }).afterClosed())).subscribe(() => this.router.navigate(['/login']));
  }

  public errorPopup(): void {
    this.popup(this.errorPopUp);
  }

  public popup(data: IPopupConfig): MatDialogRef<PopupComponent> {
    return this.dialog.open(PopupComponent, { data });
  }

  public goBack(): void {
    this.location.back();
  }
}
