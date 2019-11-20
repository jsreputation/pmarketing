import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  Voucher,
  IVoucherService,
  RedemptionType,
  IPopupConfig,
  NotificationService,
  PopUpClosedCallBack,
} from '@perx/core';
import { Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil, map, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-blackcomb-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit, OnDestroy, PopUpClosedCallBack {
  public voucher$: Observable<Voucher>;
  public voucherId: number;
  public redemptionType: RedemptionType;
  private destroy$: Subject<void> = new Subject<void>();
  public rt: typeof RedemptionType = RedemptionType;
  public headLine: string;
  public subHeadLine: string;
  public codeInstructionsText: string = `Please input this code when redeeming your reward at the Merchant`;
  public rewardSuccessPopUp: IPopupConfig = {
    title: 'REDEEM_SUCCESSFULLY',
    text: 'REDEEM_SUCCESS_TEXT',
    buttonTxt: 'BACK_TO_WALLET',
    imageUrl: '',
  };
  public errorPopUp: IPopupConfig = {
    title: 'TRY_AGAIN_LATER',
    text: '',
    buttonTxt: 'BACK_TO_WALLET',
    imageUrl: '',
  };

  private initTranslate(): void {
    this.translate.get('ENTER_CODE').subscribe((text) => this.headLine = text);
    this.translate.get('REDEMPTION_CODE').subscribe((text) => this.subHeadLine = text);
    [
      this.rewardSuccessPopUp.title,
      this.rewardSuccessPopUp.text,
      this.rewardSuccessPopUp.buttonTxt,
      this.errorPopUp.title,
      this.errorPopUp.buttonTxt
    ]
      .filter(k => k !== undefined && k !== null)
      .forEach((k: string) => this.translate.get(k).subscribe((text) => k = text));
  }

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private vouchersService: IVoucherService,
    private router: Router,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) {
  }

  public ngOnInit(): void {
    this.initTranslate();
    this.voucher$ = this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        map((params: ParamMap) => params.get('id')),
        map((id: string) => Number.parseInt(id, 10)),
        tap((id: number) => this.voucherId = id),
        switchMap((id: number) => this.vouchersService.get(id)),
        tap((voucher: Voucher) => {
          if (this.rewardSuccessPopUp.text && voucher.reward) {
            this.rewardSuccessPopUp.text = this.rewardSuccessPopUp.text.replace('{{reward}}', voucher.reward.name);
          }
          this.redemptionType = voucher.reward && voucher.reward.redemptionType ? voucher.reward.redemptionType : RedemptionType.none;
          if (voucher.reward) {
            if (voucher.reward.displayProperties && voucher.reward.displayProperties.merchantPinText) {
              this.headLine = voucher.reward.displayProperties.merchantPinText.headLine || this.headLine;
              this.subHeadLine = voucher.reward.displayProperties.merchantPinText.subHeadLine || this.subHeadLine;
            }

            if (voucher.reward.displayProperties && voucher.reward.displayProperties.rewardSuccessPopUp) {
              this.rewardSuccessPopUp.title = voucher.reward.displayProperties.rewardSuccessPopUp.headLine;
              this.rewardSuccessPopUp.text = voucher.reward.displayProperties.rewardSuccessPopUp.subHeadLine;
              this.rewardSuccessPopUp.imageUrl = voucher.reward.displayProperties.rewardSuccessPopUp.imageURL
                || this.rewardSuccessPopUp.imageUrl;
              this.rewardSuccessPopUp.buttonTxt = voucher.reward.displayProperties.rewardSuccessPopUp.buttonTxt
                || this.rewardSuccessPopUp.buttonTxt;
            }

            if (voucher.reward.displayProperties && voucher.reward.displayProperties.codeInstructionsText) {
              this.codeInstructionsText = voucher.reward.displayProperties.codeInstructionsText.headLine || '';
            }

            if (voucher.reward.displayProperties && voucher.reward.displayProperties.errorPopUp) {
              this.errorPopUp.title = voucher.reward.displayProperties.errorPopUp.headLine;
              this.errorPopUp.text = voucher.reward.displayProperties.errorPopUp.subHeadLine;
              this.errorPopUp.buttonTxt = voucher.reward.displayProperties.errorPopUp.buttonTxt || this.errorPopUp.buttonTxt;
              this.errorPopUp.imageUrl = voucher.reward.displayProperties.errorPopUp.imageURL || this.errorPopUp.imageUrl;
            }
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
    this.translate.get(['REEDEM_QUEST', 'GO_TO_LOGIN'])
      .subscribe((dictionary) => this.popup({
        title: dictionary.REEDEM_QUEST,
        buttonTxt: dictionary.GO_TO_LOGIN
      }));
  }

  public errorPopup(): void {
    this.popup(this.errorPopUp);
  }

  public popup(data: IPopupConfig): void {
    data.afterClosedCallBack = this;
    return this.notificationService.addPopup(data);
  }

  public goBack(): void {
    this.location.back();
  }

  public dialogClosed(): void {
    this.router.navigate(['/login']);
  }
}
