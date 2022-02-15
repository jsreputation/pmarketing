import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../services/order.service';
import { NotificationService, IProfile, IMerchantAdminService, IPopupConfig } from '@perxtech/core';
import { Router } from '@angular/router';
import { IQrPayload } from '../../services/order.service';

@Component({
  selector: 'app-select-record-type',
  templateUrl: './select-record-type.component.html',
  styleUrls: ['./select-record-type.component.scss']
})
export class SelectRecordTypeComponent implements OnInit {

  public payload: IQrPayload;
  public user: IProfile;

  public invalidCodePopup: IPopupConfig = {
    title: 'Invalid QR Code',
    text: 'The code was not recognized',
    buttonTxt: 'Ok',
  };
  public userNotFoundPopup: IPopupConfig = {
    title: 'User not found',
    text: 'User not found',
    buttonTxt: 'Ok',
  };

  constructor(private notificationService: NotificationService,
              private orderService: OrderService,
              private router: Router,
              private merchantAdminService: IMerchantAdminService) {
      this.orderService.getScannedUser$.subscribe((userDetails: IProfile) => {
        this.user = userDetails;
      });
  }

  public ngOnInit(): void {
    const scannedQrCode = history.state.data;
    if (scannedQrCode) {
      try {
        this.payload = JSON.parse(scannedQrCode);
        if (this.payload.verifiedUser) {
          this.user = this.payload.verifiedUser;
          this.orderService.setScannedUser(this.user);
        } else {
          this.merchantAdminService.getCustomerDetails(null, this.payload?.identifier).subscribe(
            (userDetails: IProfile) => {
              this.user = userDetails;
              this.orderService.setScannedUser(this.user);
            },
            () => {
              this.notificationService.addPopup(this.userNotFoundPopup);
              this.router.navigate(['/home']);
            });
        }
      } catch (error) {
        this.router.navigate(['/home']);
        this.notificationService.addPopup(this.invalidCodePopup);
      }
    }
  }

  public goToNextPage(): void {
    if (this.user?.customProperties?.state === 'preactivated') {
      this.router.navigate(['/create-order']);
    } else {
      this.router.navigate(['/reserve-order-items']);
    }
  }

  public onCancel(): void {
    this.router.navigate(['/home']);
  }

}
