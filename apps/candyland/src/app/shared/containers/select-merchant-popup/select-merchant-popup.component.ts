import { ChangeDetectionStrategy, Component, Inject } from '@angular/core';
import { Merchant } from '@cl-core/http-adapters/merchant';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { MerchantsService } from '@cl-core-services';

@Component({
  selector: 'cl-select-merchant-popup',
  templateUrl: './select-merchant-popup.component.html',
  styleUrls: ['./select-merchant-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectMerchantPopupComponent {
  public dataSource: CustomDataSource<Merchant>;
  public selectMerchant: IMerchant;
  public displayedColumns: string[] = ['logo', 'name', 'date', 'phone', 'branches'];

  constructor(
    public dialogRef: MatDialogRef<SelectMerchantPopupComponent>,
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
