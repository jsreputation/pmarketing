import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RewardConfirmComponent } from '../../components/reward-confirm/reward-confirm.component';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import { map, switchMap, take, takeUntil, tap, filter } from 'rxjs/operators';
import { IReward, NotificationService, RewardsService, LoyaltyService, ILoyalty } from '@perx/core';
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
    // TODO Uncomment when loyaltyService.exchangePoints will be implemented
    // private loyaltyService: LoyaltyService
  ) {
  }

  public ngOnInit(): void {
    this.rewardState$ = this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        map((params: ParamMap) => parseInt(params.get('id'), 10)),
        switchMap((id: number) => this.rewardsService.getReward(id).pipe(map((reward) => this.rewardData = reward))),
        takeUntil(this.destroy$)
      );

    this.loyaltyService.getLoyalties().pipe(switchMap((loyalyes: ILoyalty[]) => {
      return this.loyaltyService.getLoyalty(loyalyes[0].id);
    })).subscribe((loyalty) => this.loyalty = loyalty);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public buyReward(): void {
    const dialog = this.dialog.open(RewardConfirmComponent, {
      data: {
        title: this.rewardData.name,
        existingPoints: this.loyalty.expiringPoints
          && this.loyalty.expiringPoints.length ? this.loyalty.expiringPoints[0].points : null,
        requiredPoints: 20
      }
    });

    dialog.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        switchMap((result) => result ? this.exchangePoints() : of(null))
      )
      .subscribe(() => {
      });
  }

  public dialogClosed(): void {
    this.router.navigate(['']);
  }

  private exchangePoints(): Observable<any> {
    // TODO integrate this method, when it will be ready
    // return this.loyaltyService.exchangePoints(1, 1, 1);
    return of(true)
      .pipe(
        switchMap(() => combineLatest(
          [this.translateService.get('YOUR_BALANCE_IS'),
          this.translateService.get('POINTS')]
        ).pipe(
          take(1),
          tap(([balance, points]) => this.notificationService.addPopup({
            title: '[Reward Title]',
            text: `${balance} ${29} ${points}`,
            afterClosedCallBack: this
          }))
        )
        ),
      );
  }
}
