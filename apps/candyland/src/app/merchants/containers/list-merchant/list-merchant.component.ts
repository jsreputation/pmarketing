import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CustomDataSource, DataSourceStates } from '@cl-shared/table/data-source/custom-data-source';
import { CreateMerchantPopupComponent } from '@cl-shared/containers/create-merchant-popup/create-merchant-popup.component';

import { combineLatest, Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';

import { MerchantsService } from '@cl-core-services';
import { TranslateDefaultLanguageService } from '@cl-core/translate-services/translate-default-language.service';
import { TranslateService } from '@ngx-translate/core';
import { CRUDParser, RequestType } from '@cl-helpers/crud-parser';
import { IJsonApiItemPayload, IWMerchantBranchAttributes } from '@perx/whistler';
import { MerchantBranch } from '@cl-core/http-adapters/merchant';

@Component({
  selector: 'cl-list-merchant',
  templateUrl: './list-merchant.component.html',
  styleUrls: ['./list-merchant.component.scss']
})
export class ListMerchantComponent implements OnDestroy {
  private destroy$: Subject<void> = new Subject();
  public dataSource: CustomDataSource<Partial<IMerchantForm>>;
  public dataSourceStates: typeof DataSourceStates = DataSourceStates;

  constructor(
    private merchantService: MerchantsService,
    public dialog: MatDialog,
    private readonly translate: TranslateService,
    private translateDefaultLanguage: TranslateDefaultLanguageService
  ) {
    this.setTranslateLanguage();
    this.dataSource = new CustomDataSource<Partial<IMerchantForm>>(this.merchantService);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public branchesRequests(currentBranches: any[], updatedBranches: any[], merchant: IMerchantForm): Observable<any>[] {
    return CRUDParser.buildRequestList(currentBranches, updatedBranches, (type, data) => {
      switch (type) {
        case RequestType.CREATE:
          return this.createBranch(data, merchant.id);
        case RequestType.UPDATE:
          return this.updateBranch(data, merchant.id);
        case RequestType.DELETE:
          return this.deleteBranch(data.id);
      }
    });
  }

  public deleteBranch(branchId: string): Observable<any> {
    return this.merchantService.deleteMerchantBranch(branchId);
  }

  public updateBranch(data: MerchantBranch, merchantId: string): Observable<IJsonApiItemPayload<IWMerchantBranchAttributes>> {
    return this.merchantService.updateMerchantBranch(merchantId, data);
  }

  public createBranch(data: MerchantBranch, merchantId: string): Observable<IJsonApiItemPayload<IWMerchantBranchAttributes>> {
    return this.merchantService.createMerchantBranch(merchantId, data);
  }

  public openDialogCreate(merchant?: IMerchantForm): void {
    let branches = [];
    if (merchant && merchant.branches) {
      branches = JSON.parse(JSON.stringify(merchant.branches));
    }
    const dialogRef = this.dialog.open(CreateMerchantPopupComponent, {
      data: merchant ? merchant : null
    });

    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((updatedMerchant: IMerchantForm) => {
          if (merchant) {
            return this.merchantService.updateMerchant(merchant.id, updatedMerchant)
              .pipe(
                switchMap(() => {
                  const result = this.branchesRequests(branches, updatedMerchant.branches, updatedMerchant);
                  return combineLatest(result);
                })
              );
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

  public deleteMerchant(merchant: IMerchantForm): void {
    this.merchantService.deleteMerchant(merchant.id)
      .subscribe(() => this.dataSource.updateData());
  }

  public duplicateMerchant(merchant: IMerchantForm): void {
    this.merchantService.duplicateMerchant(merchant)
      .subscribe(() => this.dataSource.updateData());
  }

  public handlerAction(data: { action: 'edit' | 'delete' | 'duplicate', merchant: IMerchantForm }): void {
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
