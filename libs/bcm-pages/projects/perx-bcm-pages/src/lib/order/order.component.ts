import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IMerchantAdminService, IMerchantProfile, NotificationService} from '@perxtech/core';
import { switchMap } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Validators, FormBuilder, FormGroup, AbstractControl } from '@angular/forms';

export interface IPayload {
  name: string;
  id: number;
  rewardId?: number;
  identifier?: string;
}


@Component({
  selector: 'perx-bcm-pages-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss']
})
export class OrderComponent implements OnInit {
  public payload: IPayload;
  public orderForm: FormGroup;
  public isSummaryActivated: boolean = false;

  constructor(
    private router: Router,
    private notificationService: NotificationService,
    private merchantAdminService: IMerchantAdminService,
    private fb: FormBuilder,
  ) {
  }

  public get description(): AbstractControl | null {
    return this.orderForm.get('description');
  }

  public get amountPaid(): AbstractControl | null {
    return this.orderForm.get('amountPaid');
  }

  private initForm(): void {
    const now = new Date();
    const dateStamp = (`0${now.getDate()}/`).slice(-3) + (`0${now.getMonth() + 1}/`).slice(-3)  +
    now.getFullYear().toString();
    const timeStamp = (`${now.getHours()}:`).slice(-3) + (`0${now.getMinutes()}`).slice(-2);

    this.orderForm = this.fb.group({
      transactionDate: [dateStamp, Validators.required],
      transactionTime: [timeStamp, Validators.required],
      description: ['', Validators.required],
      amountPaid: [0]
    });
  }

  public ngOnInit(): void {
    this.initForm();
    const scannedQrCode = history.state.data;
    if (scannedQrCode) {
      try {
        this.payload = JSON.parse(scannedQrCode);
      } catch (error) {
        this.notificationService.addSnack('Invalid QR Code');
      }
    }
  }

  public onCancel(): void {
    this.router.navigate(['/home']);
  }

  public toggleSummary(): void {
    this.isSummaryActivated = !this.isSummaryActivated;
  }

  public onCompleteTransaction(): void {

    const description: string = this.orderForm.value.description;
    const amount: number = this.orderForm.value.amountPaid;

    // 0 padded date
    const date = new Date();
    // @ts-ignore
    const dateStamp = (`0${date.getDate()}`).slice(-2) + (`0${date.getMonth() + 1}`).slice(-2) + date.getFullYear().toString();

    this.merchantAdminService.getMerchantProfile()
      .pipe(
        switchMap((merchantProfile: IMerchantProfile) => {
          const merchantName: string | undefined = merchantProfile.merchantAccount && merchantProfile.merchantAccount.name;
          if (!merchantName) {
            return throwError({ message: 'merchant name is required' });
          }

          return this.merchantAdminService.createTransaction(
              this.payload?.id, '', amount, '',
              'purchase', `${dateStamp}-${this.payload.id}`, '', '', merchantName,
              description);
        }))
      .subscribe(() => {
        this.notificationService.addSnack('Transaction completed');
        this.router.navigate(['/home']);
      });
  }

}
