import { Component, OnDestroy } from '@angular/core';
import { MerchantHttpAdapter } from '@cl-core/http-adapters/merchant-http-adapter';
import { Merchant } from '@cl-core/http-adapters/merchant';
import { MatDialog } from '@angular/material';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { CreateMerchantPopupComponent } from '@cl-shared/containers/create-merchant-popup/create-merchant-popup.component';

import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { MerchantsService } from '@cl-core-services';

@Component({
  selector: 'cl-list-merchant',
  templateUrl: './list-merchant.component.html',
  styleUrls: ['./list-merchant.component.scss']
})
export class ListMerchantComponent implements OnDestroy {
  private destroy$: Subject<any> = new Subject();

  public dataSource: CustomDataSource<Merchant>;

  constructor(
    private merchantService: MerchantsService,
    public dialog: MatDialog
  ) {
    this.dataSource = new CustomDataSource<Merchant>(this.merchantService);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openDialogCreate(merchant?: Merchant): void {
    const dialogRef = this.dialog.open(CreateMerchantPopupComponent, {
      data: merchant ? MerchantHttpAdapter.transformToMerchantForm(merchant) : null
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean),
        switchMap((updatedMerchant: IMerchantForm) => {
          if (merchant) {
            return this.merchantService.updateMerchant(merchant.id, updatedMerchant);
          }
          return this.merchantService.createMerchant(updatedMerchant);
        }),
        filter(data => data)
      )
      .subscribe(
        () => this.dataSource.updateData(),
        (err) => console.error(err)
      );
  }

  public deleteMerchant(merchant: Merchant): void {
    this.merchantService.deleteMerchant(merchant.id)
      .subscribe(() => this.dataSource.updateData());
  }

  public duplicateMerchant(merchant: Merchant): void {
    this.merchantService.duplicateMerchant(merchant)
      .subscribe(() => this.dataSource.updateData());
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
