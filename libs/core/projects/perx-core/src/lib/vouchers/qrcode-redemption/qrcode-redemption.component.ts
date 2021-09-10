import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { IVoucher } from '../models/voucher.model';
import { forkJoin } from 'rxjs';
import { IVoucherService } from '../ivoucher.service';
import { ProfileService } from '../../profile/profile.service';

@Component({
  selector: 'perx-core-qrcode-redemption',
  templateUrl: './qrcode-redemption.component.html',
  styleUrls: ['./qrcode-redemption.component.scss']
})
export class QrcodeRedemptionComponent implements OnChanges {

  @Input()
  public voucherId: number;

  @Input()
  public voucher: IVoucher;
  public qrCodeDetails?: string;

  constructor(private vouchersService: IVoucherService,
              private profileService: ProfileService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.voucherId) {
      forkJoin([ this.vouchersService.get(this.voucherId),
      this.profileService.whoAmI()]).subscribe(
        ([voucher, profile]) => {
          this.voucher = voucher;
          this.qrCodeDetails = JSON.stringify(
            {
              id: profile.id,
              name: profile.lastName,
              identifier: profile.identifier,
              rewardId: this.voucher.reward?.id,
              voucherId: this.voucherId,
              voucherCode: this.voucher.code
            });
        });
    }
  }
}
