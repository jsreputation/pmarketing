import { Component, OnInit, OnDestroy } from '@angular/core';
import {
  RewardsService,
  IReward,
  IPrice,
  IVoucherService,
  LoyaltyService,
  ILoyalty,
  NotificationService,
  PopupComponent
} from '@perx/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { filter, map, switchMap, takeUntil, tap, last } from 'rxjs/operators';
import { Observable, Subject, of, combineLatest } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'perx-blackcomb-reward-details',
  templateUrl: './reward-details.component.html',
  styleUrls: ['./reward-details.component.scss']
})
export class RewardDetailsComponent implements OnInit, OnDestroy {
  public reward$: Observable<IReward>;
  public displayPriceFn: (price: IPrice) => string;
  private destroy$: Subject<any> = new Subject();
  public descriptionLabel: string = 'Description';
  public tncLabel: string = 'Terms and Conditions';
  public buttonLabel: string = 'Redeem';
  public rewardData: IReward;
  private loyalty: ILoyalty;

  private initTranslate(): void {
    this.translate.get('REDEEM').subscribe((text) => this.buttonLabel = text);
    this.translate.get('POINTS')
      .subscribe((points: string) => {
        this.displayPriceFn = (price: IPrice) => `${price.price} ${points}`;

      });
    this.translate.get('DESCRIPTION')
      .subscribe((desc: string) => {
        this.descriptionLabel = desc;
      });
    this.translate.get('Terms and Conditions')
      .subscribe((tnc: string) => {
        this.tncLabel = tnc;
      });
  }

  constructor(
    private rewardsService: RewardsService,
    private vouchersService: IVoucherService,
    private loyaltyService: LoyaltyService,
    private activeRoute: ActivatedRoute,
    private translate: TranslateService,
    private notificationService: NotificationService,
    private router: Router,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.initTranslate();
    this.loyaltyService.getLoyalties().pipe(
      map(loyalties => loyalties[0])
    ).subscribe(
      (loyalty: ILoyalty) => this.loyalty = loyalty
    );
    this.reward$ = this.activeRoute.params
      .pipe(
        filter((ps: Params) => ps.id),
        map((ps: Params) => Number.parseInt(ps.id, 10)),
        switchMap((id: number) => this.rewardsService.getReward(id)),
        tap((reward: IReward) => {
          this.rewardData = reward;
          if (reward.displayProperties) {
            this.buttonLabel = reward.displayProperties.CTAButtonTxt || this.buttonLabel;
          }
        }),
        takeUntil(this.destroy$)
      );
  }

  public buyReward(): void {
    const dataTemp = {
      title: this.rewardData ? this.rewardData.name : '',
      existingPoints: this.loyalty ? this.loyalty.pointsBalance : 0,
      requiredPoints: this.rewardData &&
        this.rewardData.rewardPrice &&
        this.rewardData.rewardPrice.length > 0 ? this.rewardData.rewardPrice[0].points || 0 : 0
    };

    combineLatest([
      this.translate.get('YOU_CURRENTLY_HAVE'),
      this.translate.get('POINTS'),
      this.translate.get('USE_POINTS'),
      this.translate.get('PROCEED'),
      this.translate.get('CONFIRM'),
      this.translate.get('CANCEL')])
      .pipe(
        last(),
        switchMap(
          ([balance, points, user_point, proceed, confirm, cancel]) => this.dialog.open(PopupComponent, {
            data: {
              title: this.rewardData.name,
              text: `${balance} ${dataTemp.existingPoints} ${points}. ${user_point} ${dataTemp.requiredPoints} ${points} ${proceed}.`,
              afterClosedCallBack: this,
              buttonTxt: confirm,
              buttonTxt2: cancel
            }
          }).afterClosed()
        )
      ).pipe(
        switchMap((result) => result ? this.exchangePoints() : of(null)),
        takeUntil(this.destroy$),
      ).subscribe(() => { });
  }

  public dialogClosed(): void {
    this.router.navigate(['/wallet']);
  }

  private exchangePoints(): Observable<void> {
    return this.vouchersService.issueReward(this.rewardData.id, undefined, undefined, this.loyalty.cardId)
      .pipe(
        switchMap(() => combineLatest([
          this.translate.get('YOUR_BALANCE_IS'),
          this.translate.get('POINTS'),
          this.translate.get('CLOSE')])
          .pipe(
            last(),
            tap(([balance, points, close]) => this.notificationService.addPopup({
              title: this.rewardData.name,
              text: `${balance} ${29} ${points}`,
              afterClosedCallBack: this,
              buttonTxt: close
            })),
            map(() => { return; })
          )
        )
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
