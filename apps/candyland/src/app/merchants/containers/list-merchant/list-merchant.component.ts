import { Component, OnDestroy } from '@angular/core';
import { Merchant } from '@cl-core/http-adapters/merchant';
import { MerchantsService } from '@cl-core/services';
import { MatDialog } from '@angular/material';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { CreateMerchantPopupComponent } from '@cl-shared/containers/create-merchant-popup/create-merchant-popup.component';
import { filter, switchMap } from 'rxjs/operators';

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

  public openDialogCreate(merchant?: Merchant): void {
    const dialogRef = this.dialog.open(CreateMerchantPopupComponent, {
      data: merchant || null
    });

    dialogRef.afterClosed()
      .pipe(
        untilDestroyed(this),
        filter(Boolean),
        switchMap(updatedMerchant => {
          if (merchant) {
            console.log('updateMerchant', updatedMerchant);
            return this.merchantService.updateMerchant(merchant.id, updatedMerchant);
          }
          return this.merchantService.createMerchant(updatedMerchant);
        })
      )
      .subscribe((data) => {
        if (data) {
          this.dataSource.updateData();
        }
      });
  }

  public deleteMerchant(merchant: Merchant): void {
    this.merchantService.deleteMerchant(merchant.id).subscribe(
      () => this.dataSource.updateData()
    );
  }

  public duplicateMerchant(merchant: Merchant): void {
    // console.log('duplicateMerchant');
    this.merchantService.duplicateMerchant(merchant).subscribe(
      () => this.dataSource.updateData()
    );
  }

  public handlerAction(data: { action: 'edit' | 'delete' | 'duplicate', merchant: IMerchant }): void {
    const actions = {
      edit: this.openDialogCreate.bind(this),
      delete: this.deleteMerchant.bind(this),
      duplicate: this.duplicateMerchant.bind(this)
    };
    // tslint:disable
    (typeof actions[data.action] === 'function') && actions[data.action](data.merchant);
  }

}
