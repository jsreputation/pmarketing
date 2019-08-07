import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MerchantService } from '@cl-core/services/merchant.service';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { CreateMerchantPopupComponent } from '@cl-shared/containers/create-merchant-popup/create-merchant-popup.component';

@Component({
  selector: 'cl-list-merchant',
  templateUrl: './list-merchant.component.html',
  styleUrls: ['./list-merchant.component.scss']
})
export class ListMerchantComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;
  public dataSource = new MatTableDataSource<any>();
  private destroy$ = new Subject();

  constructor(private merchantService: MerchantService,
              public dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.getListMerchant();
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
  }

  public ngAfterViewInit(): void {
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }

  public openDialogCreate(): void {
    const dialogRef = this.dialog.open(CreateMerchantPopupComponent);

    dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe(() => {
      });
  }

  private getListMerchant(): void {
    this.merchantService.getMerchantList()
      .subscribe((res) => {
        this.dataSource.data = res;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
