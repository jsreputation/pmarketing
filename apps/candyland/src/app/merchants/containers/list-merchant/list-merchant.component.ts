import { Component, OnDestroy } from '@angular/core';
import { MerchantHttpAdapter } from '@cl-core/http-adapters/merchant-http-adapter';
import { Merchant } from '@cl-core/http-adapters/merchant';
import { MatDialog } from '@angular/material';
import { CustomDataSource, DataSourceStates } from '@cl-shared/table/data-source/custom-data-source';
import { CreateMerchantPopupComponent } from '@cl-shared/containers/create-merchant-popup/create-merchant-popup.component';

import { Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { MerchantsService } from '@cl-core-services';
import { TranslateDefaultLanguageService } from '@cl-core/translate-services/translate-default-language.service';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cl-list-merchant',
  templateUrl: './list-merchant.component.html',
  styleUrls: ['./list-merchant.component.scss']
})
export class ListMerchantComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject();
  public dataSource: CustomDataSource<Merchant>;
  public dataSourceStates: typeof DataSourceStates = DataSourceStates;

  constructor(
    private merchantService: MerchantsService,
    public dialog: MatDialog,
    private readonly translate: TranslateService,
    private translateDefaultLanguage: TranslateDefaultLanguageService
  ) {
    this.setTranslateLanguage();
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
        filter(Boolean),
        switchMap((updatedMerchant: IMerchantForm) => {
          if (merchant) {
            return this.merchantService.updateMerchant(merchant.id, updatedMerchant);
          }
          return this.merchantService.createMerchant(updatedMerchant);
        }),
        filter(data => !!data),
        takeUntil(this.destroy$),
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

  private setTranslateLanguage(): void {
    this.translateDefaultLanguage.defaultLanguage$
      .subscribe((language: string) => {
        this.translate.setDefaultLang(language);
      });
  }
}
