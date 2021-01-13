import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import {
  StampService,
  IStampCard,
  IPopupConfig,
  NotificationService,
  PuzzleCollectReward,
  IStamp,
  StampState, ThemesService, ITheme
} from '@perxtech/core';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { filter, switchMap, takeUntil, map, tap, pairwise } from 'rxjs/operators';
import { Subject, Observable, of, forkJoin } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { oc } from 'ts-optchain';

export interface IRewardPopupConfig extends IPopupConfig {
  afterClosedCallBackRedirect?: PopUpClosedCallBack;
  url?: string;
}

export interface PopUpClosedCallBack {
  closeAndRedirect(url: string): void;
}

@Component({
  selector: 'perx-blackcomb-stamp-card',
  templateUrl: './stamp-card.component.html',
  styleUrls: ['./stamp-card.component.scss']
})

export class StampCardComponent implements OnInit, OnDestroy {
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
    private notificationService: NotificationService,
    private themesService: ThemesService,
    private translate: TranslateService
  ) {
  }

  private initTranslate(): void {
    this.newStampsLabelFn = () => this.translate.get('GAME_PAGE.STAMPS_LABEL_TXT');
  }

  public ngOnInit(): void {
    this.themesService.getThemeSetting().subscribe((theme: ITheme) => {
      this.buttonStyle['background-color'] = theme.properties['--button_background_color'] || '';
      this.buttonStyle.color = theme.properties['--button_text_color'] || '';
      this.buttonStyle.visibility = 'visible';
    });
    this.initTranslate();
    this.route.paramMap
      .pipe(
        filter((params: ParamMap) => params.has('id')),
        map((params: ParamMap) => params.get('id')),
        switchMap((id: string) => {
          this.idN = Number.parseInt(id, 10);
          return this.stampService.getCurrentCard(this.idN);
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
            this.buttonText = stampCard.buttonText ? of(stampCard.buttonText) : this.translate.get('STAMP_CAMPAIGN.VIEW_WALLET');
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
          this.translate.get('STAMP_CAMPAIGN.YOU_GOT_A_NEW_STAMP')
            .subscribe(translation => this.notificationService.addSnack(translation));
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

            // if (!this.cols || !this.rows) {
            //   throw new Error(`cols or rows is required`);
            // }

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

              this.translate.get('STAMP_CAMPAIGN.THANK_YOU_FOR_PLAYING')
                .subscribe(translation => this.notificationService.addPopup({
                  text: translation
                }));
            }

            if (stamp.vouchers && stamp.vouchers.length > 0) {
              const voucherId = stamp.vouchers[0].id;
              forkJoin([
                this.translate.get('STAMP_CAMPAIGN.REWARD_POPUP_TITLE'),
                this.translate.get('STAMP_CAMPAIGN.REWARD_POPUP_TEXT'),
                this.translate.get('STAMP_CAMPAIGN.REWARD_POPUP_BUTTON_TEXT')
              ]).subscribe(translations => {
                const data: IRewardPopupConfig = {
                  title: translations[0],
                  text: translations[1],
                  imageUrl: 'assets/prize.png',
                  disableOverlayClose: true,
                  ctaButtonClass: 'ga_game_completion',
                  url: `/voucher/${voucherId}`,
                  afterClosedCallBackRedirect: this,
                  buttonTxt: translations[2],
                };
                this.notificationService.addPopup(data);
              });
            }

          } else {
            if (!this.stampCard || !this.stampCard.stamps) {
              throw new Error('card or stamps is required');
            }

            const issuedLeft = this.stampCard.stamps.filter(s => s.state === StampState.issued);
            if (issuedLeft.length === 0) {
              forkJoin([
                this.translate.get('STAMP_CAMPAIGN.NO_REWARD_POPUP_TITLE'),
                this.translate.get('STAMP_CAMPAIGN.NO_REWARD_POPUP_TEXT'),
                this.translate.get('STAMP_CAMPAIGN.NO_REWARD_POPUP_BUTTON_TEXT')
              ]).subscribe(translations => {
                // all redeemed but no voucher
                const data: IPopupConfig = {
                  title: translations[0],
                  text: translations[1],
                  disableOverlayClose: true,
                  afterClosedCallBack: this,
                  buttonTxt: translations[2],
                };
                this.notificationService.addPopup(data);
              });
            }
          }
        })
      .catch(
        () => {
          forkJoin([
            this.translate.get('STAMP_CAMPAIGN.ERROR_TITLE'),
            this.translate.get('STAMP_CAMPAIGN.ERROR_TEXT')
          ]).subscribe(translations => {
            this.notificationService.addPopup({
              title: translations[0],
              text: translations[1]
            });
            this.router.navigateByUrl('/home');
          });
        }
      );
  }

  public dialogClosed(): void {
    this.router.navigate(['/home']);
  }

  public closeAndRedirect(url: string): void {
    this.router.navigateByUrl(url);
  }
}
