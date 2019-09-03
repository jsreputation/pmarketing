import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import Utils from '@cl-helpers/utils';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { map, switchMap, tap } from 'rxjs/operators';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import { RewardReplenishPopupComponent } from 'src/app/rewards/containers/reward-replenish-popup/reward-replenish-popup.component';
import { RewardsService } from '@cl-core/services';

@Component({
  selector: 'cl-reward-detail-page',
  templateUrl: './reward-detail-page.component.html',
  styleUrls: ['./reward-detail-page.component.scss']
})
export class RewardDetailPageComponent implements OnInit, AfterViewInit, OnDestroy {
  public dataSource = new MatTableDataSource<any>();
  public id: string;
  public data;
  public statusFilterConfig: OptionConfig[];

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;

  constructor(private rewardsService: RewardsService,
              private router: Router,
              private route: ActivatedRoute,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.getMockData();
    this.handleRouteParams();
  }

  public ngAfterViewInit(): void {
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    this.dataSource.paginator = this.paginator;
  }

  public ngOnDestroy(): void {
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

  public updateRewardImage(image: WindowBase64): void {
    // TODO: integrate post request when avaible endpoint for images
    console.log(image);
  }

  get avaibleVouchers(): any {
    return this.data.vouchersStatistics.find(voucher => voucher.type === 'available');
  }

  set avaibleVouchers(value) {
    this.avaibleVouchers.value = value;
  }

  private getMockData(): void {
    this.rewardsService.getMocksRewardDetail()
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
      });
  }

  private handleRouteParams(): void {
    this.route.paramMap.pipe(
      untilDestroyed(this),
      map((params: ParamMap) => params.get('id')),
      tap( id => this.id = id),
      switchMap(id => this.rewardsService.getReward(id))
    )
      .subscribe(
        reward => {
          this.data = Utils.nestedObjectAssign(this.data, reward);
          this.cd.detectChanges();
        },
        () => this.router.navigateByUrl('/rewards')
      );
  }
}
