import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource, MatSnackBar } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import Utils from '@cl-helpers/utils';

import { Subject } from 'rxjs';
import { map, switchMap, filter, takeUntil } from 'rxjs/operators';

import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import { RewardReplenishPopupComponent } from 'src/app/rewards/containers/reward-replenish-popup/reward-replenish-popup.component';
import { RewardsService, MerchantsService } from '@cl-core/services';
import { VouchersService } from '@cl-core/services/vouchers.service';
import { of, combineLatest } from 'rxjs';

@Component({
  selector: 'cl-reward-detail-page',
  templateUrl: './reward-detail-page.component.html',
  styleUrls: ['./reward-detail-page.component.scss']
})
export class RewardDetailPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$: Subject<any> = new Subject();

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public id: string;
  public data: {
    name?: string;
    rewardInfo?: any;
    merchantInfo?: any;
    vouchers?: any;
    limits?: any;
    vouchersStatistics?: { type: string, value: number }[];
  } = {};
  public statusFilterConfig: OptionConfig[];

  public rewardData: any;

  @ViewChild(MatPaginator, { static: false }) private paginator: MatPaginator;

  constructor(
    private rewardsService: RewardsService,
    private vouchersService: VouchersService,
    private merchantsService: MerchantsService,
    private router: Router,
    private route: ActivatedRoute,
    public cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private snack: MatSnackBar
  ) { }

  public ngOnInit(): void {
    this.handleRouteParams();
  }

  public ngAfterViewInit(): void {
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    this.dataSource.paginator = this.paginator;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openDialogReplenish(): void {
    const dialogRef = this.dialog.open(RewardReplenishPopupComponent, { panelClass: 'reward-replenish-dialog', data: this.data });
    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((data: any) => this.vouchersService.createVoucher(data))
      )
      .subscribe(
        () => this.snack.open('Vouchers succesfully replenished.', 'x', { duration: 2000 }),
        () => this.snack.open('Could not replenish vouchers. Make sure that the configuration is correct.', 'x', { duration: 2000 })
      );
  }

  get availableVouchers(): number {
    if (!this.data.vouchersStatistics) {
      this.data.vouchersStatistics = [];
    }
    const v = this.data.vouchersStatistics.find(voucher => voucher.type === 'available');
    return v !== undefined ? v.value : 0;
  }

  private handleRouteParams(): void {
    const $id = this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      map((params: ParamMap) => params.get('id'))
    );
    $id.subscribe(id => this.id = id);
    $id
      .pipe(
        switchMap(id => this.rewardsService.getRewardToForm(id)),
        switchMap(reward => {
          const merchantQuery = reward.rewardInfo.merchantId !== null ?
            this.merchantsService.getMerchant(reward.rewardInfo.merchantId) : of(null);
          return combineLatest(of(reward), merchantQuery);
        }),
      ).subscribe(
        ([reward, merchant]) => {
          this.data = Utils.nestedObjectAssign(this.data, reward);
          this.data.merchantInfo = merchant;
          this.cd.detectChanges();
        },
        (err) => { console.error(err); this.router.navigateByUrl('/rewards'); }
      );
    $id.pipe(switchMap(id => this.vouchersService.getStats(id)))
      .subscribe((stats: { [k: string]: number }) => {
        if (!this.data.vouchersStatistics) {
          this.data.vouchersStatistics = [];
        }
        // tslint:disable-next-line: forin
        for (const k in stats) {
          this.data.vouchersStatistics.push({ type: k, value: stats[k] });
        }
        this.cd.detectChanges();
      });
  }
}
