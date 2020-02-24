import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { MerchantsService } from '@cl-core-services';
import { IMerchant } from '@cl-core/models/merchant/merchant-simple-interface';
import { IMerchantForm } from '@cl-core/models/merchant/merchant-form-interface';

@Component({
  selector: 'cl-select-merchant-popup',
  templateUrl: './select-merchant-popup.component.html',
  styleUrls: ['./select-merchant-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SelectMerchantPopupComponent {
  public dataSource: CustomDataSource<IMerchantForm>;
  public selectMerchant: IMerchant;
  public displayedColumns: string[] = ['logo', 'name', 'date', 'phone', 'branches'];

  constructor(
    public dialogRef: MatDialogRef<SelectMerchantPopupComponent>,
    private merchantService: MerchantsService
  ) {
    this.dataSource = new CustomDataSource<IMerchantForm>(this.merchantService);
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
