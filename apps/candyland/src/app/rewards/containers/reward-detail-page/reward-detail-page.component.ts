import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { map, tap } from 'rxjs/operators';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import { RewardReplenishPopupComponent } from 'src/app/rewards/containers/reward-replenish-popup/reward-replenish-popup.component';
import { RewardsService } from '@cl-core/services/rewards.service';

@Component({
  selector: 'cl-reward-detail-page',
  templateUrl: './reward-detail-page.component.html',
  styleUrls: ['./reward-detail-page.component.scss']
})
export class RewardDetailPageComponent implements  AfterViewInit {
  public dataSource = new MatTableDataSource<any>();
  public data;
  public statusFilterConfig: OptionConfig[];

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;

  constructor(private rewardsService: RewardsService,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog) {
  }

  public ngAfterViewInit(): void {
    this.getData();
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    this.dataSource.paginator = this.paginator;
  }

  public openDialogReplenish(): void {
    const dialogRef = this.dialog.open(RewardReplenishPopupComponent,
      {panelClass: 'reward-replenish-dialog', data: this.data.vouchers.voucherCode});

    dialogRef.afterClosed().subscribe((value) => {
      if (value) {
        this.avaibleVouchers = value;
      }
    });
  }

  get avaibleVouchers(): any {
    return this.data.vouchersStatistics.find(voucher => voucher.type === 'available');
  }

  set avaibleVouchers(value) {
    this.avaibleVouchers.value = value;
  }

  private getData(): void {
    this.rewardsService.getReward()
      .pipe(
        map((data: any) => {
            data.campaigns.map(item => {
              item.begin = new Date(item.begin);
              item.end = new Date(item.end);
              return item;
            });
            return data;
          }
        ),
        tap(data => {
          const counterObject = PrepareTableFilers.countFieldValue(data.campaigns, 'status');
          this.statusFilterConfig = PrepareTableFilers.prepareTabsFilterConfig(counterObject);
        })
      )
      .subscribe((res: any) => {
        this.data = res;
        this.dataSource.data = res.campaigns;
        this.cd.detectChanges();
      });
  }
}
