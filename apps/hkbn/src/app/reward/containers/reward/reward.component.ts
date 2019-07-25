import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material';
import { RewardConfirmComponent } from '../../components/reward-confirm/reward-confirm.component';
import { Observable, of, Subject } from 'rxjs';
import { switchMap, takeUntil, tap } from 'rxjs/operators';
import { NotificationService } from '@perx/core/dist/perx-core';
import { Router } from '@angular/router';

@Component({
  selector: 'hkbn-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnDestroy {

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private dialog: MatDialog,
              private notificationService: NotificationService,
              private router: Router,
              // TODO Uncomment when loyaltyService.exchangePoints will be implemented
              // private loyaltyService: LoyaltyService
  ) {
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
      .subscribe();
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
