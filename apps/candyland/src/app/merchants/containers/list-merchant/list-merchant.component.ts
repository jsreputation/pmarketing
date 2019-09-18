import { AfterViewInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Merchant } from '@cl-core/http-adapters/merchant';
import { MerchantsService } from '@cl-core/services';
import { MatDialog } from '@angular/material';
import { MerchantsListDataSource } from '@cl-shared/table/data-source/merchants-list-data-source';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreateMerchantPopupComponent } from '@cl-shared/containers/create-merchant-popup/create-merchant-popup.component';

@Component({
  selector: 'cl-list-merchant',
  templateUrl: './list-merchant.component.html',
  styleUrls: ['./list-merchant.component.scss']
})
export class ListMerchantComponent implements OnInit, AfterViewInit, OnDestroy {
  // @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  public dataSource: MerchantsListDataSource<Merchant>;
  private destroy$ = new Subject();

  constructor(private merchantService: MerchantsService,
              public dialog: MatDialog) {
    this.dataSource = new MerchantsListDataSource<Merchant>(this.merchantService);
  }

  public ngOnInit(): void {
    // this.merchantService.getTableData({include: 'branches'})
    //   .subscribe(data => console.log('test', data));
    // this.getListMerchant();
    // this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
  }

  public ngAfterViewInit(): void {
    // if (this.paginator) {
      // this.dataSource.paginator = this.paginator;
    // }
  }

  public openDialogCreate(merchant?: IMerchant): void {
    const dialogRef = this.dialog.open(CreateMerchantPopupComponent, {
      data: merchant
    });

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
      });
  }

  public handlerAction(data: {action: 'edit' | 'delete' | 'duplicate', merchant: IMerchant}): void {
    const actions = {
      edit: this.openDialogCreate.bind(this),
      delete: '',
      duplicate: ''
    };
    // tslint:disable
    ( typeof actions[data.action] === 'function' ) && actions[data.action](data.merchant);
  }

  // private getListMerchant(): void {
  //   this.merchantService.getMerchantList()
  //     .subscribe((res) => {
  //       this.dataSource.data = res;
  //     });
  // }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
