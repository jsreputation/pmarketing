import { ActivatedRoute, Router, Params } from '@angular/router';
import { StampService, IStampCard, IStamp, IPopupConfig, PuzzleCollectReward, NotificationService, StampState, ConfigService } from '@perxtech/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { switchMap, tap, takeUntil, pairwise } from 'rxjs/operators';
import { Subject, of } from 'rxjs';
import { oc } from 'ts-optchain';
import { AnalyticsService, PageType } from '../analytics.service';

export interface IRewardPopupConfig extends IPopupConfig {
  afterClosedCallBackRedirect?: PopUpClosedCallBack;
  url?: string;
}

export interface PopUpClosedCallBack {
  closeAndRedirect(url: string): void;
}

@Component({
  selector: 'app-stamp-card',
  templateUrl: './stamp-card.component.html',
  styleUrls: ['./stamp-card.component.scss']
})
export class StampCardComponent implements OnInit, OnDestroy {

  public title: string;
  public subTitle?: string;
  public background: string | undefined | null;
  public cardBackground: string;
  public isEnabled: boolean = false;
  public stamps: IStamp[] | undefined;
  public stampCard: IStampCard | null;
  public numberOfCols: number | undefined;
  public numberOfRows: number | undefined;
  private idN: number;
  private destroy$: Subject<void> = new Subject();
  public newStampsLabelFn = () => of(' new stamps');
  private rewardSuccessPopUp: IPopupConfig = {
    title: 'Stamp collect successfully',
    buttonTxt: 'View Reward'
  };
  private errorPopUp: IPopupConfig = {
    title: 'Error occur, please try again later',
    buttonTxt: 'Try again'
  };

  public v4Rewards(card: IStampCard): PuzzleCollectReward[] {
    if (!card || !card.displayProperties.rewardPositions) {
      throw new Error('card or rewardPositions is required');
    }
    return card.displayProperties.rewardPositions.map((el: number) => ({ rewardPosition: --el }));
  }

  constructor(
    private stampService: StampService,
    private route: ActivatedRoute,
    private router: Router,
    private analytics: AnalyticsService,
    private notificationService: NotificationService,
    private configService: ConfigService
  ) {
  }

  public ngOnInit(): void {
    this.configService.readAppConfig()
      .pipe(
        switchMap(() => this.route.queryParams),
        switchMap((params: Params) => {
          if (params.id) {
            this.idN = Number.parseInt(params.id, 10);
            return this.stampService.getCurrentCard(this.idN);
          }
          return of({} as IStampCard);
        }),
        tap((stampCard: IStampCard) => {
          if (stampCard) {
            this.stampCard = stampCard;
            this.stamps = stampCard.stamps;
            this.title = stampCard.title || '';
            this.subTitle = stampCard.subTitle;
            this.background = oc(stampCard).displayProperties.backgroundImg.value.imageUrl(
              oc(stampCard).displayProperties.cardImage.value.imageUrl('')
            );
            this.cardBackground = stampCard.displayProperties.cardBgImage || '';
            const successOutcome = stampCard.results.outcome;
            const noOutcome = stampCard.results.noOutcome;
            if (noOutcome) {
              this.errorPopUp.title = noOutcome.title;
              this.errorPopUp.text = noOutcome.subTitle;
              this.errorPopUp.imageUrl = noOutcome.image || this.errorPopUp.imageUrl;
              this.errorPopUp.buttonTxt = noOutcome.button || this.errorPopUp.buttonTxt;
            }
            if (successOutcome) {
              this.rewardSuccessPopUp.title = successOutcome.title;
              this.rewardSuccessPopUp.text = successOutcome.subTitle;
              this.rewardSuccessPopUp.imageUrl = successOutcome.image || this.rewardSuccessPopUp.imageUrl;
              this.rewardSuccessPopUp.buttonTxt = successOutcome.button || this.rewardSuccessPopUp.buttonTxt;
            }
            if ((window as any).appboy) {
              (window as any).appboy.logCustomEvent(
                'user_view_stamp_card',
                { stamp_card_id: this.stampCard.id, campaign_id: this.stampCard.campaignId }
              );
            }
            this.analytics.addEvent({
              pageName: `rewards:stamp:${this.title}`,
              pageType: PageType.static,
              siteSectionLevel2: 'rewards:stamp',
              siteSectionLevel3: 'rewards:stamp'
            });
          }
        }),
        switchMap(() => this.stampService.stampsChangedForStampCard(this.idN)
          .pipe(
            pairwise()
          )),
        takeUntil(this.destroy$)
      ).subscribe(([prevStamps, currStamps]) => {
        // after skip once we get definitely prev and current
        if ((currStamps && currStamps.stamps) &&
          (prevStamps && prevStamps.stamps) &&
          prevStamps.stamps.length < currStamps.stamps.length) {
          this.stampCard = currStamps;
          this.notificationService.addSnack('You got a new stamp!');
        }
      }, () => this.router.navigate(['/wallet']));
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public async handleStamp(stamp: IStamp): Promise<void> {
    if (!this.stampCard || !this.stampCard.stamps) {
      throw new Error('card or stamps is required');
    }

    // build ordered list of stamps to be stamped
    const stamps: IStamp[] = this.stampCard.stamps.filter(s => s.state === StampState.issued);
    for (const st of stamps) {
      await this.redeemStamp(st.id);
      if (st.id === stamp.id) {
        break;
      }
    }
  }

  private redeemStamp(stampId: number): Promise<void> {
    return this.stampService.putStamp(stampId)
      .toPromise()
      .then(
        (stamp: IStamp) => {
          if (stamp.state === StampState.redeemed) {
            if (!this.stampCard || !this.stampCard.stamps) {
              throw new Error('card or stamps is required');
            }
            const redeemedCard = this.stampCard.stamps.map((cardStamp: IStamp) => {
              if (cardStamp.id === stampId) {
                return { ...cardStamp, state: StampState.redeemed };
              }
              return cardStamp;
            });
            this.stampCard = { ...this.stampCard, stamps: redeemedCard };

            const redeemedTransactionsCount = this.stampCard.stamps &&
              this.stampCard.stamps.filter(s => s.state === StampState.redeemed).length;

            if (this.stampCard.displayProperties.displayCampaignAs === 'stamp_card'
              && redeemedTransactionsCount === (this.stampCard.campaignConfig && this.stampCard.campaignConfig.totalSlots)) {
              this.notificationService.addPopup({
                // tslint:disable-next-line: max-line-length
                text: 'Thank you for playing! You have already received the maximum number of stamps. Don\'t forget to redeem your earned rewards!'
              });
            }

            if (stamp.vouchers && stamp.vouchers.length > 0) {
              const voucherId = stamp.vouchers[0].id;
              const data: IRewardPopupConfig = {
                title: 'Congratulations!',
                text: 'Here is a reward for you.',
                imageUrl: 'assets/prize.png',
                disableOverlayClose: true,
                ctaButtonClass: 'ga_game_completion',
                url: `/voucher/${voucherId}`,
                afterClosedCallBackRedirect: this,
                buttonTxt: 'View Reward',
              };
              this.notificationService.addPopup(data);
            }

          } else {
            if (!this.stampCard || !this.stampCard.stamps) {
              throw new Error('card or stamps is required');
            }

            const issuedLeft = this.stampCard.stamps.filter(s => s.state === StampState.issued);
            if (issuedLeft.length === 0) {
              // all redeemed but no voucher
              const data: IPopupConfig = {
                title: 'No Reward Received',
                text: 'Try again next time',
                disableOverlayClose: true,
                afterClosedCallBack: this,
                buttonTxt: 'Close',
              };
              this.notificationService.addPopup(data);
            }
          }
        })
      .catch(
        () => {
          this.notificationService.addPopup({
            title: 'Something went wrong, with our server',
            text: 'We notified our team. Sorry about the inconvenience.'
          });
          this.router.navigateByUrl('/home');
        }
      );
  }

  public dialogClosed(): void {
    this.router.navigate(['/home']);
  }

  public closeAndRedirect(url: string): void {
    this.router.navigateByUrl(url);
  }

  public hasRewards(): boolean {
    let result = false;
    if (this.stampCard && this.stampCard.stamps) {
      this.stampCard.stamps.forEach(stamp => {
        if (stamp && stamp.vouchers && stamp.vouchers.length > 0 && stamp.state === StampState.redeemed) {
          result = true;
        }
      });
    }
    return result;
  }
}
