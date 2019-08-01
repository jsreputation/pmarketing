import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RewardConfirmComponent } from '../../components/reward-confirm/reward-confirm.component';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { IReward, NotificationService, RewardsService } from '@perx/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

@Component({
  selector: 'hkbn-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit, OnDestroy {

  public rewardState$: BehaviorSubject<IReward> = new BehaviorSubject<IReward>(null);
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog,
              private notificationService: NotificationService,
              private router: Router,
              private route: ActivatedRoute,
              private rewardsService: RewardsService,
              // TODO Uncomment when loyaltyService.exchangePoints will be implemented
              // private loyaltyService: LoyaltyService
  ) {
  }

  public ngOnInit(): void {
    this.route.paramMap
      .pipe(
        map((params: ParamMap) => parseInt(params.get('id'), 10)),
        switchMap((id: number) => this.rewardsService.getReward(id)),
        takeUntil(this.destroy$)
      )
      .subscribe((reward: IReward) => {
        this.rewardState$.next(reward);
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public buyReward(): void {
    const dialog = this.dialog.open(RewardConfirmComponent, {
      data: {
        title: '[Reward Title]',
        existingPoints: 49,
        requiredPoints: 20
      }
    });

    dialog.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        switchMap((result) => result ? this.exchangePoints() : of(null))
      )
      .subscribe(() => {});
  }

  public dialogClosed(): void {
    this.router.navigate(['']);
  }

  private exchangePoints(): Observable<any> {
    // TODO integrate this method, when it will be ready
    // return this.loyaltyService.exchangePoints(1, 1, 1);
    return of(true)
      .pipe(
        tap(() => this.notificationService.addPopup({
          title: '[Reward Title]',
          text: `Points balance: ${29} points`,
          afterClosedCallBack: this
        }))
      );
  }

}
