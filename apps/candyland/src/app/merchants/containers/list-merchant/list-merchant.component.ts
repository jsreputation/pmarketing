import { Component, OnDestroy } from '@angular/core';
import { Merchant } from '@cl-core/http-adapters/merchant';
import { MerchantsService } from '@cl-core/services';
import { MatDialog } from '@angular/material';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { logger } from 'codelyzer/util/logger';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { CreateMerchantPopupComponent } from '@cl-shared/containers/create-merchant-popup/create-merchant-popup.component';

@Component({
  selector: 'cl-list-merchant',
  templateUrl: './list-merchant.component.html',
  styleUrls: ['./list-merchant.component.scss']
})
export class ListMerchantComponent implements OnDestroy {
  public dataSource: CustomDataSource<Merchant>;

  constructor(private merchantService: MerchantsService,
              public dialog: MatDialog) {
    this.dataSource = new CustomDataSource<Merchant>(this.merchantService);
  }

  public ngOnDestroy(): void {
  }

  public openDialogCreate(merchant: Merchant): void {
    const dialogRef = this.dialog.open(CreateMerchantPopupComponent, {
      data: merchant
    });

    dialogRef.afterClosed()
      .pipe(untilDestroyed(this))
      .subscribe(() => {
      });
  }

  public deleteMerchant(merchant: Merchant): void {
      this.merchantService.deleteMerchant(merchant.id).subscribe(
        data => console.log('delete', data)
      );
  }

  public duplicateMerchant(merchant: Merchant): void {
    console.log('duplicateMerchant');
    this.merchantService.duplicateMerchant(merchant).subscribe(
      data => console.log('duplicateMerchant', data)
    );
  }

  public handlerAction(data: { action: 'edit' | 'delete' | 'duplicate', merchant: IMerchant }): void {
    const actions = {
      edit: this.openDialogCreate.bind(this),
      delete: this.deleteMerchant.bind(this),
      duplicate: this.duplicateMerchant(this)
    };
    // tslint:disable
    (typeof actions[data.action] === 'function') && actions[data.action](data.merchant);
  }

}
