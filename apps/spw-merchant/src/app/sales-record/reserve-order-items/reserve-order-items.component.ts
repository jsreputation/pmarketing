import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMerchantAdminService, IPosLoyaltyTransaction, NotificationService, Voucher, ErrorMessageService,
   IPopupConfig, ILoyalty, IProfile } from '@perxtech/core';
import { catchError } from 'rxjs/operators';
import { EMPTY, } from 'rxjs';
import { HttpResponseBase } from '@angular/common/http';
import { OrderService } from '../../services/order.service';
import { IQrPayload } from '../../services/order.service';

interface IHttpResponseBase extends HttpResponseBase {
  error: {
    code: number;
    message: string;
  };
}

@Component({
  selector: 'app-reserve-order-items',
  templateUrl: './reserve-order-items.component.html',
  styleUrls: ['./reserve-order-items.component.scss']
})
export class ReserveOrderItemsComponent implements OnInit {
  public userDetails: IProfile;
  public voucherPayload: IQrPayload;
  public voucher: Voucher;
  public loyaltyPoints: number = 0;
  public reservedLoyaltyId: number = null;
  public loyaltyInputError: string;
  public loyaltyProgramId: number;
  public invalidCodePopup: IPopupConfig = {
    title: 'Invalid Code',
    text: 'The code was not recognized',
    buttonTxt: 'Ok',
  };
  public invalidStateVoucherPopup: IPopupConfig = {
    title: 'Invalid Voucher',
    text: 'The voucher is not valid anymore',
    buttonTxt: 'Ok',
  };
  public invalidVoucherPopup: IPopupConfig = {
    title: 'Invalid Voucher',
    text: 'The voucher code is invalid',
    buttonTxt: 'Ok',
  };

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private merchantAdminService: IMerchantAdminService,
    private errorMessageService: ErrorMessageService,
    private orderService: OrderService,
  ) {
    this.orderService.getScannedUser$.subscribe((userDetails: IProfile) => {
        this.userDetails = userDetails;
    });

    this.orderService.getReservedVoucher$.subscribe((voucher: Voucher) => {
      this.voucher = voucher;
    });

    this.orderService.getReservedPoints$.subscribe((loyaltyPoint: IPosLoyaltyTransaction) => {
      this.reservedLoyaltyId = loyaltyPoint?.id;
      this.loyaltyPoints = loyaltyPoint?.points ? Math.abs(loyaltyPoint.points) : 0;
    });

  }

  public ngOnInit(): void {
    if (this.userDetails?.customProperties?.state === 'preactivated') {
        this.router.navigate(['/select-record-type']);
    }
    const scannedQrCode = history.state.data;
    if (scannedQrCode) {
      try {
        const parsedQrCode = JSON.parse(scannedQrCode);
        this.voucherPayload = parsedQrCode;
        const voucherId = this.voucherPayload.voucherId;
        if (!voucherId) {
          this.notificationService.addPopup(this.invalidCodePopup);
        } else {
          this.redeemVoucher(Number(voucherId));
        }
      } catch (error) {
        this.notificationService.addPopup(this.invalidCodePopup);
      }
    }

    this.merchantAdminService.getCustomerLoyalties(this.userDetails?.identifier).subscribe(
      (loyalties: ILoyalty[]) => {
        const loyalty = loyalties.find((item: ILoyalty) => item.name === 'VizCoin Program');
        this.loyaltyProgramId = loyalty?.id;
      }
    );
  }

  public onBack(): void {
    this.router.navigate(['/select-record-type']);
  }

  public scanVoucher(): void {
   this.router.navigate(['/qrscanner/reserve-order-items']);
  }

  public onContinue(): void {
    if (!this.loyaltyPoints && this.reservedLoyaltyId) {
      this.revertPoints(true);
    } else if (!this.loyaltyPoints || this.reservedLoyaltyId) {
      this.router.navigate(['/create-order']);
    } else if (this.loyaltyPoints && !this.reservedLoyaltyId) {
      this.merchantAdminService.reservePoints(this.loyaltyPoints, this.loyaltyProgramId, this.userDetails?.identifier).pipe(
        catchError((err) => {
          if (err?.error?.code === 40) {
            this.loyaltyInputError = 'Customer’s VizCoin balance is insufficient';
          } else {
            this.loyaltyInputError = err?.error?.message;
          }
          return EMPTY;
        }))
      .subscribe((data: IPosLoyaltyTransaction) => {
          this.reservedLoyaltyId = data.id;
          this.orderService.setReservedPoints(data);
          this.router.navigate(['/create-order']);
      });
    }
  }

  public removeVoucher(voucherId: number): void {
    const userId = this.userDetails.identifier ? this.userDetails.identifier : '';
    this.merchantAdminService.revertVoucherRedemption(voucherId, userId).subscribe(
      () => {
        this.voucher = null;
        this.orderService.setReservedVoucher(null);
        this.notificationService.addSnack('Voucher has been removed');
      },
      (err: IHttpResponseBase) =>
        this.errorMessageService.getErrorMessageByErrorCode(err.error.code, err.error.message)
          .subscribe(
            (errMessage: string) => {
              this.notificationService.addSnack(errMessage);
            })
    );
  }

  public redeemVoucher(voucherId: number): void {
    this.merchantAdminService.redeemVoucher(voucherId, this.userDetails?.identifier, true).subscribe(
      (voucher: Voucher) => {
        this.voucher = voucher;
        this.orderService.setReservedVoucher(voucher);
        this.notificationService.addSnack('Voucher has been applied');
      },
      (err) => {
        if (err?.error?.code === 405) {
          this.notificationService.addPopup(this.invalidStateVoucherPopup);
        } else {
          this.notificationService.addPopup(this.invalidVoucherPopup);
        }
      }
    );
  }

  public revertPoints(goToNextPage?: boolean): void {
    this.loyaltyInputError = null;
    if (this.reservedLoyaltyId) {
        this.merchantAdminService.revertPoints(this.reservedLoyaltyId, this.userDetails?.identifier).subscribe((id) => {
          if (this.reservedLoyaltyId === +id) {
            this.reservedLoyaltyId = null;
            this.loyaltyPoints = 0;
            this.orderService.setReservedPoints(null);
            if (goToNextPage) {
              this.router.navigate(['/create-order']);
            }
          }
        },
        (err: IHttpResponseBase) =>
        this.errorMessageService.getErrorMessageByErrorCode(err.error.code, err.error.message)
          .subscribe(
            (errMessage: string) => {
              this.notificationService.addSnack(errMessage);
            })
        );
    } else {
      this.loyaltyPoints = 0;
    }
  }

  public onPointInputChange(): void {
    if (this.loyaltyPoints < 0 || (this.loyaltyPoints && !Number.isInteger(this.loyaltyPoints))) {
      this.loyaltyInputError = 'Please enter a valid number';
      return;
    }
    this.loyaltyInputError = null;
  }

}

