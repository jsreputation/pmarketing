import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Location } from '@angular/common';
import {
  IPopupConfig,
  IVoucherService,
  NotificationService,
  PinInputComponent,
  PopUpClosedCallBack,
  RedemptionType,
  Voucher,
  VoucherState
} from '@perxtech/core';
import { of, Subject, Subscription } from 'rxjs';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-blackcomb-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit, OnDestroy, PopUpClosedCallBack {
  public status: VoucherState;
  public pinInputError: boolean = false;
  @ViewChild('pinInput', { static: false })
  private pinInputComponent: PinInputComponent;

  public voucher$: Subscription;
  public voucher: Voucher;
  public redemptionType: RedemptionType;
  private destroy$: Subject<void> = new Subject<void>();
  public rt: typeof RedemptionType = RedemptionType;
  public headLine: string;
  public subHeadLine: string;
  public codeInstructionsText: string;
  public rewardSuccessPopUp: IPopupConfig = {
    title: 'REDEMPTION.SUCCESSFUL_REDEMPTION_TITLE',
    text: 'REDEMPTION.SUCCESSFUL_REDEMPTION_TXT',
    buttonTxt: 'REDEMPTION.BACK_TO_WALLET',
    imageUrl: '',
  };
  public errorPopUp: IPopupConfig = {
    title: 'REDEMPTION.UNKNOWN_ERROR_TXT',
    text: '',
    buttonTxt: 'REDEMPTION.BACK_TO_WALLET',
    imageUrl: '',
  };

  private initTranslate(): void {
    this.translate.get('REDEMPTION.TITLE').subscribe((text) => this.headLine = text);
    this.translate.get('REDEMPTION.DESCRIPTION').subscribe((text) => this.subHeadLine = text);
    this.translate.get('REDEMPTION.CODE_INSTRUCTION_TXT').subscribe((text) => this.codeInstructionsText = text);
    if (this.rewardSuccessPopUp.title) {
      this.translate.get(this.rewardSuccessPopUp.title).subscribe((text) => this.rewardSuccessPopUp.title = text);
    }
    if (this.rewardSuccessPopUp.text) {
      this.translate.get(this.rewardSuccessPopUp.text).subscribe((text) => this.rewardSuccessPopUp.text = text);
    }
    if (this.rewardSuccessPopUp.buttonTxt) {
      this.translate.get(this.rewardSuccessPopUp.buttonTxt).subscribe((text) => this.rewardSuccessPopUp.buttonTxt = text);
    }
    if (this.errorPopUp.title) {
      this.translate.get(this.errorPopUp.title).subscribe((text) => this.errorPopUp.title = text);
    }
    if (this.errorPopUp.buttonTxt) {
      this.translate.get(this.errorPopUp.buttonTxt).subscribe((text) => this.errorPopUp.buttonTxt = text);
    }
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
        switchMap((id: number) => this.vouchersService.get(id)),
        tap((voucher: Voucher) => {
          this.voucher = voucher;
          if (this.rewardSuccessPopUp.text && voucher.reward) {
            this.rewardSuccessPopUp.text = this.rewardSuccessPopUp.text.replace('{{reward}}', voucher.reward.name);
          }
          // seems that the compiler isn't smart enough to determine the type in this ternary
          this.redemptionType =
            voucher.redemptionType && (voucher.redemptionType !== RedemptionType.txtCode) ? voucher.redemptionType :
              voucher.code ? (voucher.redemptionType as RedemptionType) : RedemptionType.offline;

          if (voucher.reward) {
            if (voucher.reward.displayProperties && voucher.reward.displayProperties.merchantPinText) {
              this.headLine = voucher.reward.displayProperties.merchantPinText.headLine || this.headLine;
              this.subHeadLine = voucher.reward.displayProperties.merchantPinText.subHeadLine || this.subHeadLine;
            }

            if (voucher.reward.howToRedeem) {
              this.codeInstructionsText = voucher.reward.howToRedeem;
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
              this.codeInstructionsText = voucher.reward.displayProperties.codeInstructionsText.headLine ||
                this.codeInstructionsText
            }

            if (voucher.reward.displayProperties && voucher.reward.displayProperties.errorPopUp) {
              this.errorPopUp.title = voucher.reward.displayProperties.errorPopUp.headLine;
              this.errorPopUp.text = voucher.reward.displayProperties.errorPopUp.subHeadLine;
              this.errorPopUp.buttonTxt = voucher.reward.displayProperties.errorPopUp.buttonTxt || this.errorPopUp.buttonTxt;
              this.errorPopUp.imageUrl = voucher.reward.displayProperties.errorPopUp.imageURL || this.errorPopUp.imageUrl;
            }
          }
        }),
        switchMap((voucher: Voucher) => {
          if (voucher.redemptionType === RedemptionType.txtCode ||
            voucher.redemptionType === RedemptionType.qr ||
            voucher.redemptionType === RedemptionType.barcode) {
            return this.vouchersService.stateChangedForVoucher(voucher.id, 1000);
          }
          return of(voucher);
        }),
        takeUntil(this.destroy$)
      ).subscribe(
        (voucher: Voucher) => {
          if (voucher.state === VoucherState.issued) {
            this.status = voucher.state;
          }
          if (this.status === VoucherState.issued && voucher.state === VoucherState.redeemed) {
            const rewardName = this.voucher.reward ? this.voucher.reward.name : '';
            this.notificationService.addPopup({
              title: this.rewardSuccessPopUp.title,
              text: this.rewardSuccessPopUp.text ? this.rewardSuccessPopUp.text.replace('{{reward}}', rewardName) : '',
              buttonTxt: this.rewardSuccessPopUp.buttonTxt,
              imageUrl: 'assets/redeem_success.png',
            });
            this.router.navigate(['wallet']);
          }
        },
        () => { /* voucher status polling is not implemented in whistler */ }
      );
  }

  public ngOnDestroy(): void {
    this.voucher$.unsubscribe();
    this.destroy$.next();
    this.destroy$.complete();
  }

  // public pinInputSuccess(): void {
  //   this.popup(this.rewardSuccessPopUp);
  // }

  // public errorHandler(status: number): void {
  //   if (status === 401) {
  //     this.needLoginPopup();
  //   } else {
  //     this.errorPopup();
  //   }
  // }

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

  public full(pin: string): void {
    this.vouchersService.redeemVoucher(this.voucher.id, { pin })
      .subscribe(
        () => {
          const rewardName = this.voucher.reward ? this.voucher.reward.name : '';
          this.notificationService.addPopup({
            title: this.rewardSuccessPopUp.title,
            text: this.rewardSuccessPopUp.text ? this.rewardSuccessPopUp.text.replace('{{reward}}', rewardName) : '',
            buttonTxt: this.rewardSuccessPopUp.buttonTxt,
            imageUrl: 'assets/redeem_success.png',
          });
          this.router.navigate(['wallet']);
        },
        () => {
          this.pinInputError = true;
          this.translate.get('REDEMPTION.FAIL_REDEMPTION_TXT').subscribe(text =>
            this.notificationService.addSnack(text)
          );
        }
      );
  }

  public updatePin(): void {
    this.pinInputComponent.error = false;
  }
}
