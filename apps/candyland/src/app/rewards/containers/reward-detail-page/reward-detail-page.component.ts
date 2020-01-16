import { AfterViewInit, ChangeDetectorRef, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import Utils from '@cl-helpers/utils';

import { of, combineLatest, Subject, throwError } from 'rxjs';
import { map, switchMap, takeUntil, filter, catchError } from 'rxjs/operators';

import { PrepareTableFilters } from '@cl-helpers/prepare-table-filters';
import { RewardReplenishPopupComponent } from 'src/app/rewards/containers/reward-replenish-popup/reward-replenish-popup.component';
import { RewardsService, MerchantsService, MessageService } from '@cl-core/services';
import { VouchersService } from '@cl-core/services/vouchers.service';
import { IWVouchersApi } from '@perx/whistler';
import { oc } from 'ts-optchain';
import { IRewardEntityForm } from '@cl-core/models/reward/reward-entity-form.interface';

interface IRewardDetailData {
  name?: string;
  rewardInfo?: any;
  merchantInfo?: IMerchantForm | null;
  vouchers?: any;
  limits?: any;
  vouchersStatistics?: { type: string, value: number }[];
}

@Component({
  selector: 'cl-reward-detail-page',
  templateUrl: './reward-detail-page.component.html',
  styleUrls: ['./reward-detail-page.component.scss']
})
export class RewardDetailPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();
  public id: string;
  public data: IRewardDetailData = {};
  public statusFilterConfig: OptionConfig[];

  // public rewardData: any;

  @ViewChild(MatPaginator, { static: false }) private paginator: MatPaginator;

  constructor(
    private rewardsService: RewardsService,
    private vouchersService: VouchersService,
    private merchantsService: MerchantsService,
    private router: Router,
    private route: ActivatedRoute,
    public cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private messageService: MessageService
  ) { }

  public ngOnInit(): void {
    this.handleRouteParams();
  }

  public ngAfterViewInit(): void {
    this.dataSource.filterPredicate = PrepareTableFilters.getClientSideFilterFunction();
    this.dataSource.paginator = this.paginator;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private updateVoucherStat(): void {
    this.vouchersService.getStats(this.id)
      .subscribe((stats: { [k: string]: number }) => {
        this.data.vouchersStatistics = [];
        // tslint:disable-next-line: forin
        for (const k in stats) {
          this.data.vouchersStatistics.push({ type: k, value: stats[k] });
        }
        this.cd.detectChanges();
      });
  }

  public openDialogReplenish(): void {
    this.dialog.open<RewardReplenishPopupComponent, any, IWVouchersApi>(
      RewardReplenishPopupComponent,
      { panelClass: 'reward-replenish-dialog', data: this.data }
    )
      .afterClosed()
      .pipe(
        filter(Boolean), // what is the use of this? useless
        switchMap((data: IWVouchersApi) => this.vouchersService.createVoucher(data)), // this svc not working?
      )
      .subscribe(
        () => this.messageService.show('Voucher replenishing in progress.', 'success'),
        () => this.messageService.show('Could not replenish vouchers. Make sure that the configuration is correct.', 'warning'),
        () => this.updateVoucherStat()
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
      map((params: ParamMap) => params.get('id')),
      takeUntil(this.destroy$),
    );
    // get the id and update voucher stats
    $id.subscribe(id => {
      this.id = id;
      this.updateVoucherStat();
    });
    // get reward and merchant information
    $id
      .pipe(
        switchMap(id => this.rewardsService.getRewardToForm(id)),
        switchMap(reward => {

          let merchantQuery = null;
          if (reward.rewardInfo.merchantId !== null) {
            merchantQuery = this.merchantsService.getMerchant(reward.rewardInfo.merchantId)
              .pipe(catchError((err) => {
                if (oc(err).errors[0].code() === '404') {
                  return of(null);
                }
                return throwError(err);
              }));
          } else {
            merchantQuery = of(null);
          }
          return combineLatest(of(reward), merchantQuery);
        }),
      ).subscribe(
        ([reward, merchant]: [IRewardEntityForm, IMerchantForm | null]) => {
          this.data = Utils.nestedObjectAssign(this.data, reward);
          this.data.merchantInfo = merchant;
          this.cd.detectChanges();
        },
        (err) => { console.error(err); this.router.navigateByUrl('/rewards'); }
      );
  }
}
