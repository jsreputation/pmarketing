import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';
import { IMerchantAdminService, NotificationService, Voucher, IPosLoyaltyTransaction,
  IProfile, IMerchantInvoice, ErrorMessageService, IMerchantProfile } from '@perxtech/core';
import { OrderService } from '../../services/order.service';
import { Router } from '@angular/router';
import { HttpResponseBase } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';

interface IHttpResponseBase extends HttpResponseBase {
  error: {
    code: number;
    message: string;
  };
}

@Component({
  selector: 'app-create-record',
  templateUrl: './create-record.component.html',
  styleUrls: ['./create-record.component.scss']
})
export class CreateRecordComponent implements OnInit {

  public orderForm: FormGroup;
  public userDetails: IProfile;
  public reservedVoucher: Voucher;
  public reservedPoints: IPosLoyaltyTransaction;
  public barcodeBgColor: string = '#1C00ff00';
  public isPreActivatedUser: boolean = false;

  constructor( private fb: FormBuilder,
               private notificationService: NotificationService,
               private merchantAdminService: IMerchantAdminService,
               private orderService: OrderService,
               private router: Router,
               private errorMessageService: ErrorMessageService, ) {
    this.orderService.getScannedUser$.subscribe((userDetails: IProfile) => {
      this.userDetails = userDetails;
      this.isPreActivatedUser = this.userDetails?.customProperties?.state === 'preactivated';
    });

    this.orderService.getReservedVoucher$.subscribe((voucher: Voucher) => {
      this.reservedVoucher = voucher;
    });

    this.orderService.getReservedPoints$.subscribe((points: IPosLoyaltyTransaction) => {
      this.reservedPoints = points;
    });
  }

  public ngOnInit(): void {
    this.initForm();
  }

  public get receipt(): AbstractControl | null {
    return this.orderForm.get('receipt');
  }

  public get netAmount(): AbstractControl | null {
    return this.orderForm.get('netAmount');
  }

  private initForm(): void {
    this.orderForm = this.fb.group({
      receipt: ['', Validators.required],
      netAmount: ['', [ Validators.required, Validators.pattern('^[0-9]+\\.?[0-9]*$') ]]
    });
  }

  public goToPreviousPage(): void {
    if (this.isPreActivatedUser) {
      this.router.navigate(['/select-record-type']);
    } else {
      this.router.navigate(['/reserve-order-items']);
    }
  }

  public onCreateRecord(): void {
    const receipt: string = this.orderForm.value.receipt;
    const amount: number = this.orderForm.value.netAmount;
    const userId: string = this.userDetails.identifier;

    this.merchantAdminService.getMerchantProfile()
    .pipe(
    switchMap((merchantProfile: IMerchantProfile) => {
      const merchantName: string | undefined = merchantProfile.merchantAccount && merchantProfile.merchantAccount.name;
      if (!merchantName) {
        return throwError({ message: 'merchant name is required' });
      }

      return this.merchantAdminService.createInvoice(userId, amount, receipt, this.reservedVoucher?.id,
                                                  this.reservedPoints?.id, merchantName);
    })).subscribe((invoice: IMerchantInvoice) => {
      const invoiceRecord: IMerchantInvoice = invoice;
      invoiceRecord.collectedAmount = amount;
      invoiceRecord.pointsPaid = (invoice?.pointId === this.reservedPoints?.id) ? -(this.reservedPoints.points) : null;
      invoiceRecord.voucherName = (invoice?.voucherId === this.reservedVoucher?.id) ? this.reservedVoucher.reward?.name : null;
      this.orderService.setReservedVoucher(null);
      this.orderService.setReservedPoints(null);
      this.orderService.setInvoice(invoiceRecord);
      this.router.navigate(['/order-summary']);
    },
    (err: IHttpResponseBase) =>
      this.errorMessageService.getErrorMessageByErrorCode(err.error.code, err.error.message)
      .subscribe(
        (errMessage: string) => {
          this.notificationService.addSnack(errMessage);
        }));
  }

}
