import {
  ChangeDetectionStrategy,
  Component,
  Inject,
  OnInit,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
} from '@angular/material';

import * as moment from 'moment';
import { IWVouchersApi } from '@perxtech/whistler';

@Component({
  selector: 'cl-reward-replenish-popup',
  templateUrl: './reward-replenish-popup.component.html',
  styleUrls: ['./reward-replenish-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RewardReplenishPopupComponent implements OnInit {
  public replenishVoucherCodes: number | null = null;
  public voucherSettings: any;
  public rewardInfo: Partial<IWVouchersApi>;

  constructor(
    public dialogRef: MatDialogRef<RewardReplenishPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  public ngOnInit(): void {
    this.voucherSettings = this.data.vouchers;
  }

  public close(): void {
    this.dialogRef.close();
  }

  public replenish(): void {
    if (this.replenishVoucherCodes !== null) {
      this.rewardInfo = {
        amount: this.replenishVoucherCodes,
        start_date: moment().toISOString(),
        source_id: this.data.id,
        code_type: this.voucherSettings.voucherCode.type,
        code: this.voucherSettings.voucherCode.singleCode.code,
        prefix: this.voucherSettings.voucherCode.uniqueGeneratedCode.prefix,
        length: this.voucherSettings.voucherCode.uniqueGeneratedCode.length,
        format_type: this.voucherSettings.voucherCode.uniqueGeneratedCode.codeFormat
      };
      this.dialogRef.close(this.rewardInfo);
    }
  }

  public setReplenishVoucherCodes(value: number): void {
    this.replenishVoucherCodes = value;
  }
}
