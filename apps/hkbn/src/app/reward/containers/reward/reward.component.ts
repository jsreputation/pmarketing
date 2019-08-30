import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RewardConfirmComponent, IRewardConfirmComponentParam } from '../../components/reward-confirm/reward-confirm.component';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap, filter, last } from 'rxjs/operators';
import { IReward, NotificationService, RewardsService, LoyaltyService, ILoyalty, IPopupConfig, PopupComponent } from '@perx/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'hkbn-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit, OnDestroy {

  public rewardState$: Observable<IReward>;
  public loyalty: ILoyalty;
  public rewardData: IReward;
  private destroy$: Subject<void> = new Subject<void>();
  constructor(
    private dialog: MatDialog,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private rewardsService: RewardsService,
    private translateService: TranslateService,
    private loyaltyService: LoyaltyService
  ) {
  }

  public ngOnInit(): void {
    this.rewardState$ = this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        map((params: ParamMap) => parseInt(params.get('id'), 10)),
        switchMap((id: number) => this.rewardsService.getReward(id).pipe(tap((reward) => this.rewardData = reward))),
        takeUntil(this.destroy$)
      );

    this.loyaltyService.getLoyalty().subscribe((loyalty) => this.loyalty = loyalty);

    this.notificationService.$popup.subscribe((data: IPopupConfig) => this.dialog.open(PopupComponent, { data }));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public buyReward(): void {
    const data: IRewardConfirmComponentParam = {
      title: this.rewardData ? this.rewardData.name : '',
      existingPoints: this.loyalty.pointsBalance,
      requiredPoints: this.rewardData.rewardPrice[0].points
    };
    this.dialog.open(RewardConfirmComponent, { data }
    ).afterClosed().pipe(
      takeUntil(this.destroy$),
      switchMap((result) => result ? this.exchangePoints() : of(null))
    ).subscribe(() => { });
  }

  public dialogClosed(): void {
    this.router.navigate(['/wallet']);
  }

  private exchangePoints(): Observable<any> {
    return this.rewardsService.reserveReward(this.rewardData.id)
      .pipe(
        switchMap(() => combineLatest([this.translateService.get('YOUR_BALANCE_IS'), this.translateService.get('POINTS')])
          .pipe(
            last(),
            tap(([balance, points]) => this.notificationService.addPopup({
              title: '[Reward Title]',
              text: `${balance} ${29} ${points}`,
              afterClosedCallBack: this
            }))
          )
        )
      );
  }
}
