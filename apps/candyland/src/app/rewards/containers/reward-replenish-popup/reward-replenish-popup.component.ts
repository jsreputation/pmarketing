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

@Component({
  selector: 'cl-reward-replenish-popup',
  templateUrl: './reward-replenish-popup.component.html',
  styleUrls: ['./reward-replenish-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RewardReplenishPopupComponent implements OnInit {
  public replenishVoucherCodes: boolean = null;
  public voucherSettings: any;
  public rewardInfo: any;

  constructor(public dialogRef: MatDialogRef<RewardReplenishPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
  }

  public ngOnInit(): void {
    this.voucherSettings = this.data.vouchers;
  }

  public close(): void {
    this.dialogRef.close();
  }

  public replenish(): void {
    if (this.replenishVoucherCodes) {
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

  public setReplenishVoucherCodes(value: any): void {
    this.replenishVoucherCodes = value;
  }
}
