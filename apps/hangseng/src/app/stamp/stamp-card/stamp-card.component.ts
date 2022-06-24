import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import {
  CampaignOutcomeType,
  IRewardPopupConfig,
  IStamp,
  IStampCard,
  IStampOutcome,
  ITheme,
  NotificationService,
  PuzzleCollectReward,
  RewardPopupComponent,
  StampService,
  StampState,
  ThemesService,
  IFlags,
  SettingsService,
} from '@perxtech/core';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  debounceTime,
  filter,
  map,
  pairwise,
  switchMap,
  takeUntil,
  tap,
} from 'rxjs/operators';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { oc } from 'ts-optchain';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'hangseng-stamp-card',
  templateUrl: './stamp-card.component.html',
  styleUrls: ['./stamp-card.component.scss'],
})
export class StampCardComponent implements OnInit, OnDestroy {
  @Input()
  public isTeamsEnabled: boolean = false;

  public buttonStyle: { [key: string]: string } = {};
  public title: string; // = 'Scratch & Win!'
  public subTitle?: string; //  = 'Collect all 10 stickers and win a reward!'
  public background: string | undefined | null;
  public cardBackground: string;
  public isEnabled: boolean = false;
  public stamps: IStamp[] | undefined;
  public stampCard: IStampCard | null;
  public buttonText: Observable<string>;
  public newStampsLabelFn: () => Observable<string>;
  private idN: number;
  private destroy$: Subject<void> = new Subject();
  public showPrizeSetOutcome: boolean = false;
  public showPointsHistory: boolean = false;
  public remoteFlags: IFlags;

  public v4Rewards(card: IStampCard): PuzzleCollectReward[] {
    if (!card || !card.displayProperties.rewardPositions) {
      throw new Error('card or rewardPositions is required');
    }
    return card.displayProperties.rewardPositions.map((el: number) => ({
      rewardPosition: --el,
    }));
  }

  constructor(
    private stampService: StampService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private themesService: ThemesService,
    private translate: TranslateService,
    private dialog: MatDialog,
    private settingsService: SettingsService
  ) {
  }

  private initTranslate(): void {
    this.newStampsLabelFn = () =>
      this.translate.get('GAME_PAGE.STAMPS_LABEL_TXT');
  }

  public ngOnInit(): void {
    this.settingsService.getRemoteFlagsSettings().subscribe((flags: IFlags) => {
      this.showPrizeSetOutcome = flags.showPrizeSetOutcome
        ? flags.showPrizeSetOutcome
        : false;
    });

    this.initTranslate();
    this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        map((params: ParamMap) => params.get('id')),
        switchMap((id: string) => {
          this.idN = Number.parseInt(id, 10);
          return forkJoin([
            this.stampService.getCards(this.idN).pipe(map(stampCards => stampCards[0])),
            this.themesService.getThemeSetting(),
          ]);
        }),
        tap(([stampCard, theme]: [IStampCard, ITheme]) => {
          if (stampCard) {
            this.stampCard = stampCard;
            this.stamps = stampCard.stamps;
            this.title = stampCard.title || '';
            this.subTitle = stampCard.subTitle;
            this.background = oc(
              stampCard
            ).displayProperties.backgroundImg.value.imageUrl(
              oc(stampCard).displayProperties.cardImage.value.imageUrl('')
            );
            this.cardBackground = stampCard.displayProperties.cardBgImage || '';
            this.buttonText = stampCard.buttonText
              ? of(stampCard.buttonText)
              : this.translate.get('STAMP_CAMPAIGN.VIEW_WALLET');
            this.buttonStyle['background-color'] = stampCard.displayProperties
              .buttonBgColour
              ? stampCard.displayProperties.buttonBgColour
              : theme.properties['--button_background_color']
              ? theme.properties['--button_background_color']
              : '';
            this.buttonStyle.color = stampCard.displayProperties
              .buttonTextColour
              ? stampCard.displayProperties.buttonTextColour
              : theme.properties['--button_text_color']
              ? theme.properties['--button_text_color']
              : '';
            this.buttonStyle.visibility = 'visible';
          }
        }),
        switchMap(() =>
          //todo: make a polling version to keep the stamp card updated
          this.stampService.getCards(this.idN).pipe(map(stampCards => stampCards[0])).pipe(pairwise())
        ),
        takeUntil(this.destroy$)
      )
      .subscribe(
        ([prevStamps, currStamps]) => {
          // after skip once we get definitely prev and current
          if (
            currStamps &&
            currStamps.stamps &&
            prevStamps &&
            prevStamps.stamps
          ) {
            this.stampCard = currStamps;

            const prevNumIssuedState = prevStamps.stamps.filter(
              (stamp) => stamp.state === StampState.issued
            );
            const currNumIssuedState = currStamps.stamps.filter(
              (stamp) => stamp.state === StampState.issued
            );

            if (prevNumIssuedState > currNumIssuedState) {
              this.translate
                .get('STAMP_CAMPAIGN.STAMP_CARD_UPDATED')
                .pipe(debounceTime(500))
                .subscribe((translation) =>
                  this.notificationService.addSnack(translation)
                );
            }

            if (prevStamps.stamps.length < currStamps.stamps.length) {
              this.translate
                .get('STAMP_CAMPAIGN.YOU_GOT_A_NEW_STAMP')
                .subscribe((translation) =>
                  this.notificationService.addSnack(translation)
                );
            }
            // user's other team member had finished redeeming the stamp card while user was on the page
            if (!currStamps.id && this.isTeamsEnabled) {
              this.translate
                .get('STAMP_CAMPAIGN.CARD_COMPLETED')
                .subscribe((translation) =>
                  this.notificationService.addSnack(translation)
                );
              // if (currStamps.campaignId) {
              //   this.stampService.getStamps(currStamps.campaignId).subscribe(
              //     (stamps: IStamp[]) => {
              //       const stampWithVoucher = stamps.reverse().find((stamp) => stamp.vouchers && (stamp.vouchers.length > 0));
              //       if (stampWithVoucher) {
              //         this.showRewardPopup(stampWithVoucher);
              //       }
              //     }
              //   );
              // }
              this.router.navigate([`/stamp/${currStamps?.campaignId}`]);
            }
          }
        },
        (err) => {
          console.error(err);
          this.router.navigate(['/wallet']);
        }
      );
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
    const stamps: IStamp[] = this.stampCard.stamps.filter(
      (s) => s.state === StampState.issued
    );
    for (const st of stamps) {
      await this.redeemStamp(st.id);
      if (st.id === stamp.id) {
        break;
      }
    }
  }

  private redeemStamp(stampId: number): Promise<void> {
    return this.stampService
      .putStamp(stampId)
      .toPromise()
      .then((stamp: IStamp) => {
        if (stamp.state === StampState.redeemed) {
          if (!this.stampCard || !this.stampCard.stamps) {
            throw new Error('card or stamps is required');
          }

          // if (!this.cols || !this.rows) {
          //   throw new Error(`cols or rows is required`);
          // }

          const redeemedCard = this.stampCard.stamps.map(
            (cardStamp: IStamp) => {
              if (cardStamp.id === stampId) {
                return { ...cardStamp, state: StampState.redeemed };
              }
              return cardStamp;
            }
          );
          this.stampCard = { ...this.stampCard, stamps: redeemedCard };

          const redeemedTransactionsCount =
            this.stampCard.stamps &&
            this.stampCard.stamps.filter((s) => s.state === StampState.redeemed)
              .length;

          if (
            this.stampCard.displayProperties.displayCampaignAs ===
              'stamp_card' &&
            redeemedTransactionsCount ===
              (this.stampCard.campaignConfig &&
                this.stampCard.campaignConfig.totalSlots)
          ) {
            this.translate
              .get('STAMP_CAMPAIGN.THANK_YOU_FOR_PLAYING')
              .subscribe((translation) =>
                this.notificationService.addPopup({
                  text: translation,
                })
              );
          }
          this.showRewardPopup(stamp);
        } else {
          if (!this.stampCard || !this.stampCard.stamps) {
            throw new Error('card or stamps is required');
          }

          const issuedLeft = this.stampCard.stamps.filter(
            (s) => s.state === StampState.issued
          );
          if (issuedLeft.length === 0) {
            forkJoin([
              this.translate.get('STAMP_CAMPAIGN.NO_REWARD_POPUP_TITLE'),
              this.translate.get('STAMP_CAMPAIGN.NO_REWARD_POPUP_TEXT'),
              this.translate.get('STAMP_CAMPAIGN.NO_REWARD_POPUP_BUTTON_TEXT'),
            ]).subscribe((translations) => {
              const [title, text, buttonTxt] = translations;
              // all redeemed but no voucher
              const data: IRewardPopupConfig = {
                title,
                text,
                disableOverlayClose: true,
                afterClosedCallBack: this,
                buttonTxt,
              };
              this.dialog.open(RewardPopupComponent, { data });
            });
          }
        }
      })
      .catch(() => {
        forkJoin([
          this.translate.get('STAMP_CAMPAIGN.ERROR_TITLE'),
          this.translate.get('STAMP_CAMPAIGN.ERROR_TEXT'),
        ]).subscribe((translations) => {
          const [title, text] = translations;
          this.notificationService.addPopup({
            title,
            text,
          });
          this.router.navigateByUrl('/home');
        });
      });
  }

  public dialogClosed(): void {
    this.router.navigate(['/home']);
  }

  public closeAndRedirect(url: string): void {
    this.router.navigateByUrl(url);
  }

  private showRewardPopup(stamp: IStamp): void {
    const stampOutcomes = stamp?.outcomes?.filter(
      (outcome) =>
        outcome.outcomeType === CampaignOutcomeType.prizeSet ||
        outcome.state !== 'failed'
    );

    const badgeOutcomes = stamp?.outcomes?.filter(
      (outcome) =>
        outcome.outcomeType === CampaignOutcomeType.badge ||
        outcome.state !== 'failed'
    );

    const pointsOutcomes = stamp?.outcomes?.filter(
      (outcome) =>
        outcome.outcomeType === CampaignOutcomeType.points ||
        outcome.state !== 'failed'
    );

    if (
      (stamp.vouchers && stamp.vouchers.length > 0) ||
      (this.showPrizeSetOutcome && stampOutcomes && stampOutcomes.length > 0)
    ) {
      let prizeSetOutcomes: IStampOutcome[];
      let voucherId;
      if (this.showPrizeSetOutcome && stampOutcomes) {
        prizeSetOutcomes = stampOutcomes?.filter(
          (outcome) =>
            outcome.actualOutcomeId &&
            outcome.outcomeType === CampaignOutcomeType.prizeSet
        );
      }
      if (stamp.vouchers && stamp.vouchers.length > 0) {
        voucherId = stamp.vouchers[0].id;
      }

      forkJoin([
        this.translate.get('STAMP_CAMPAIGN.REWARD_POPUP_TITLE'),
        this.translate.get('STAMP_CAMPAIGN.REWARD_POPUP_TEXT'),
        this.translate.get('STAMP_CAMPAIGN.POINTS_POPUP_TEXT'),
        this.translate.get('STAMP_CAMPAIGN.REWARD_POPUP_BUTTON_TEXT'),
        this.translate.get('PRIZE_SET.OUTCOME_SUCCESS_TITLE'),
      ]).subscribe((translations) => {
        const [
          title,
          text,
          pointsOutcomeTxt,
          buttonTxt,
          prizeSetBtnTxt,
        ] = translations;
        const data: IRewardPopupConfig = {
          title,
          text,
          imageUrl: 'assets/prize.png',
          disableOverlayClose: true,
          ctaButtonClass: 'ga_game_completion',
          // url: `/voucher-detail/${voucherId}`,
          afterClosedCallBackRedirect: this,
          showCloseBtn: false,
          buttonTxt,
        };

        if (
          this.showPrizeSetOutcome &&
          prizeSetOutcomes &&
          prizeSetOutcomes.length > 0
        ) {
          data.url = `/prize-set-outcomes/${prizeSetOutcomes[0].prizeId}?transactionId=${prizeSetOutcomes[0].actualOutcomeId}`;
          data.buttonTxt = prizeSetBtnTxt;
        } else if (voucherId) {
          data.url = `/voucher-detail/${voucherId}`;
        } else if (pointsOutcomes && pointsOutcomes?.length > 0) {
          data.url = this.showPointsHistory ? '/points/history' : '/home';
          data.text = pointsOutcomeTxt; //todo: there's no public API for stored value transactions
        } else {
          data.url =
            badgeOutcomes && badgeOutcomes?.length > 0
              ? '/badges?filter=earned'
              : '/wallet';
        }
        this.dialog.open(RewardPopupComponent, { data });

        // stop all observables and prepare for routing
        this.destroy$.next();
        this.destroy$.complete();
      });
    }
  }
}
