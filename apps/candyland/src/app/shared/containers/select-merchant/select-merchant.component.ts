import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Merchant } from '@cl-core/http-adapters/merchant';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { MerchantsService } from '@cl-core-services';

@Component({
  selector: 'cl-select-merchant',
  templateUrl: './select-merchant.component.html',
  styleUrls: ['./select-merchant.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectMerchantComponent {
  public dataSource: CustomDataSource<Merchant>;
  public selectMerchant: IMerchant;
  public displayedColumns = ['logo', 'name', 'date', 'phone', 'branches'];

  constructor(
    public dialogRef: MatDialogRef<SelectMerchantComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private merchantService: MerchantsService) {
    this.dataSource = new CustomDataSource<Merchant>(this.merchantService);
  }

  public selectedMerchant(merchant: IMerchant): void {
    this.selectMerchant = merchant;
  }

  public close(): void {
    this.dialogRef.close();
  }

  public add(): void {
    if (this.selectMerchant) {
      this.dialogRef.close(this.selectMerchant);
    }
  }
}
