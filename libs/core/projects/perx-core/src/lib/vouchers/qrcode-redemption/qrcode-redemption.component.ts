import { Component, OnChanges, Input, SimpleChanges } from '@angular/core';
import { IVoucher } from '../models/voucher.model';
import { forkJoin, iif, of } from 'rxjs';
import { IVoucherService } from '../ivoucher.service';
import { ProfileService } from '../../profile/profile.service';
import { SettingsService } from '../../settings/settings.service';
import { IFlags } from '../../settings/models/settings.model';
import { IProfile } from '../../profile/profile.model';
import { switchMap, } from 'rxjs/operators';

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
  public showAdditionalDetailsOnVoucherQR: boolean = false;

  constructor(private vouchersService: IVoucherService,
              private profileService: ProfileService,
              private settingsService: SettingsService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.voucherId) {

      this.settingsService.getRemoteFlagsSettings().pipe(
        switchMap((flags: IFlags) => {
        this.showAdditionalDetailsOnVoucherQR = flags?.showAdditionalDetailsOnVoucherQR || false;
        return forkJoin([ this.vouchersService.get(this.voucherId),
          iif(() => this.showAdditionalDetailsOnVoucherQR, this.profileService.whoAmI(), of([]))]);
        })).subscribe(
          ([voucher, profile]: [IVoucher, IProfile]) => {
            this.voucher = voucher;
            if (this.showAdditionalDetailsOnVoucherQR && profile) {
              this.qrCodeDetails = JSON.stringify(
                {
                  identifier: profile.identifier,
                  voucherId: this.voucherId
                });
            }
          });
    }
  }
}
