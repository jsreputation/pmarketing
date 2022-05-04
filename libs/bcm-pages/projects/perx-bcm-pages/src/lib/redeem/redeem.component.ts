import {
  Component,
  OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { ErrorMessageService, IMerchantAdminService, Voucher, NotificationService, IProfile } from '@perxtech/core';
import { HttpResponseBase } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin } from 'rxjs';
import { catchError,  } from 'rxjs/operators';
interface IHttpResponseBase extends HttpResponseBase {
  error: {
    code: number;
    message: string;
  };
}

interface IPayload {
  identifier?: string;
  voucherId?: number;
}

@Component({
  selector: 'perx-bcm-pages-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit {
  public payload: IPayload;
  public didProceed: boolean = false;
  private transactionCompleteTxt: string;
  public user: IProfile;
  public voucherReserved: Voucher | null;
  public errMessage: string;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private merchantService: IMerchantAdminService,
    private translateService: TranslateService,
    private errorMessageService: ErrorMessageService
  ) {
  }

  public ngOnInit(): void {
    const scannedQrCode = history.state.data;
    if (scannedQrCode) {
      try {
        const parsedQrCode = JSON.parse(scannedQrCode);
        this.payload = parsedQrCode;
        forkJoin([
        this.merchantService.redeemVoucher(parsedQrCode?.voucherId, parsedQrCode?.identifier, true).
        pipe(catchError((err) => {
          this.errMessage = 'Invalid Voucher';
          throw err;
        })),
        this.merchantService.getCustomerDetails(0, parsedQrCode?.identifier).
        pipe(catchError((err) => {
          this.errMessage = 'User not found';
          throw err;
        }
        ))
        ]).subscribe(
          ([voucher, user]: [Voucher, IProfile]) => {
              this.voucherReserved = voucher;
              this.user = user;
          },
          () => {
            this.notificationService.addSnack(this.errMessage);
          });
      } catch (error) {
        this.notificationService.addSnack('Invalid QR Code');
      }
    }

    // init translations
    this.translateService.get('POPUP_CONTENT.TRANSACTION_COMPLETED')
      .subscribe((translationComplete: string) => {
        this.transactionCompleteTxt = translationComplete;
      });
  }

  public onClose(): void {
    this.router.navigate(['/home']);
  }

  public onCancel(): void {
    if (this.voucherReserved) {
      const userId: string = this.payload.identifier ? this.payload.identifier : '';
      this.merchantService.revertVoucherRedemption(this.voucherReserved.id, userId).subscribe(
        () => {
          this.voucherReserved = null;
        },
        (err: IHttpResponseBase) =>
          this.errorMessageService.getErrorMessageByErrorCode(err.error.code, err.error.message)
            .subscribe(
              (errMessage: string) => {
                this.notificationService.addSnack(errMessage);
              })
      );
    }
    this.router.navigate(['/home']);
  }

  public onProceed(): void {
    this.didProceed = true;
    const userId: string = this.payload.identifier ? this.payload.identifier : '';
    if (!this.payload.voucherId) {
      throw new Error('voucher id is required');
    }
    this.merchantService.redeemVoucher(this.payload.voucherId, userId)
      .subscribe(() => {
        this.notificationService.addSnack(this.transactionCompleteTxt);
      },
        () => this.notificationService.addSnack('Sorry! Voucher redemption failed.')
      );
  }

}
