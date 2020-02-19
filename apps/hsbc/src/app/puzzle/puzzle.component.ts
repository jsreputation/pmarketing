import {
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import {
  ActivatedRoute,
  Router
} from '@angular/router';

import {
  map,
  mergeMap,
  tap,
  toArray,
  flatMap,
} from 'rxjs/operators';
import {
  from,
  Observable,
} from 'rxjs';

import {
  CampaignType,
  ICampaignService,
  StampService,
  ICampaign,
  IStampCard,
  StampCardState,
  StampState,
  NotificationService,
  IStamp,
  IConfig,
  ConfigService,
  PuzzleCollectReward,
  ThemesService,
  ITheme,
  RewardPopupComponent,
  IPopupConfig
} from '@perx/core';

import { SoundService } from '../sound/sound.service';
import { MatDialog } from '@angular/material';

export interface IRewardPopupConfig extends IPopupConfig {
  afterClosedCallBackRedirect?: PopUpClosedCallBack;
  url?: string;
  didWin?: boolean;
}

export interface PopUpClosedCallBack {
  closeAndRedirect(url: string, didWin: boolean): void;
}
@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.scss']
})
export class PuzzleComponent implements OnInit, OnDestroy {
  public campaignId: number | null | undefined = null;
  private cardId: number | null = null;
  private card: IStampCard | null = null;
  public availablePieces: number = 0;
  public playedPieces: number = 0;
  public totalAvailablePieces: number = 0;
  public rows: number | undefined = 2;
  public cols: number | undefined = 3;
  public image: string = '';
  private cardsCount: number = 0;
  private currentStampId: number = 0;
  public title: string = 'Stamp Card';
  public subTitle: string = 'Tap the stamps to earn your reward!';
  private displayCampaignAs: string = 'puzzle';
  public sourceType: string;
  public preStampImg: string | undefined;
  public postStampImg: string | undefined;
  public rewardPreStamp: string | undefined;
  public rewardPostStamp: string | undefined;
  public availableStampImg: string | undefined;
  public availableRewardImg: string | undefined;
  public backgroundImage: string | undefined = '';
  public cardBgImage: string | undefined;

  public get rewards(): PuzzleCollectReward[] {
    if (!this.card || !this.card.displayProperties.rewardPositions) {
      throw new Error('card or rewardPositions is required');
    }
    return this.card.displayProperties.rewardPositions.map((el: number) => ({ rewardPosition: --el }));
  }

  constructor(
    private campaignService: ICampaignService,
    private stampService: StampService,
    private route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private soundService: SoundService,
    private configService: ConfigService,
    private dialog: MatDialog,
    private themesService: ThemesService,
  ) {
  }

  public ngOnInit(): void {
    const campaignIdStr = this.route.snapshot.paramMap.get('campaignId');

    if (campaignIdStr !== null && campaignIdStr !== '') {
      this.campaignId = Number.parseInt(campaignIdStr, 10);
    }

    const cardIdStr = this.route.snapshot.paramMap.get('cardId');
    if (cardIdStr !== null && cardIdStr !== '') {
      this.cardId = Number.parseInt(cardIdStr, 10);
    }

    this.configService.readAppConfig<ITheme>()
      .pipe(
        tap((config: IConfig<ITheme>) => {
          this.sourceType = config.sourceType as string;
          if (config.sourceType === 'hsbc-xmas') {
            this.displayCampaignAs = 'stamp_card';
          }

          if (config.sourceType === 'hsbc-collect2') {
            // tslint:disable-next-line: max-line-length
            this.notificationService.addPopup({
              text: 'Thank you for joining the Collect and Win Promo! The campaign has now ended. Redemption of earned rewards is untill December 30, 2019 only.',
              disableOverlayClose: true,
              afterClosedCallBack: this
            });
          }

          if (this.campaignId === null) {
            this.fetchCampaign();
          } else if (this.cardId === null || this.card === null) {
            this.fetchCard();
          }
        }),
        flatMap((config: IConfig<ITheme>) => this.themesService.getThemeSetting(config))
      ).subscribe((res: ITheme) => {
        if (res.properties.stampCard) {
          this.preStampImg = res.properties.stampCard['--pre_stamp_image'];
          this.postStampImg = res.properties.stampCard['--post_stamp_image'];
          this.rewardPreStamp = res.properties.stampCard['--reward_pre_stamp_image'];
          this.rewardPostStamp = res.properties.stampCard['--reward_post_stamp_image'];
          this.availableStampImg = res.properties.stampCard['--available_stamp_image'];
          this.availableRewardImg = res.properties.stampCard['--available_reward_image'];
          this.backgroundImage = res.properties.stampCard['--background_image'];
          this.cardBgImage = res.properties.stampCard['--card_background_image'];
        }
      });

    if (!localStorage.getItem('enableSound')) {
      setTimeout(() => {
        this.soundService.showPopup();
      }, 50);
    } else if (localStorage.getItem('enableSound') === 'true') {
      setTimeout(() => {
        this.soundService.play();
      }, 50);
    }
  }

  public dialogClosed(): void {
    this.router.navigate(['/home']);
  }

  public ngOnDestroy(): void {
    this.soundService.pause(false);
  }

  private currentCard(campaignId: number): Observable<IStampCard> {
    return this.stampService.getCurrentCard(campaignId);
  }

  private fetchCampaign(): void {

    this.campaignService.getCampaigns()
      .pipe(
        map(campaigns => campaigns.filter(camp => camp.type === CampaignType.stamp)),
        mergeMap(
          (campaigns: ICampaign[]) => from(campaigns).pipe(
            mergeMap((campaign: ICampaign) => this.currentCard(campaign.id)),
            toArray(),
            map((stampCards: IStampCard[]) => stampCards.filter(card =>
              card.displayProperties.displayCampaignAs &&
              card.displayProperties.displayCampaignAs === this.displayCampaignAs)),
            map((cards: IStampCard[]) => cards[0]),
            tap((card: IStampCard | null) => {
              if (card) {
                this.campaignId = card.campaignId;
              }
            })
          )
        ),
      )
      .subscribe((card: IStampCard) => {
        if (!card || !card.campaignId) {
          throw new Error('card or campaignId is required');
        }

        this.fetchStampTransactionCount(card.campaignId);
        this.cardId = card.id;
        this.card = card;
        this.cols = card.displayProperties.numberOfCols;
        this.rows = card.displayProperties.numberOfRows;
        if (!this.cols || !this.rows) {
          throw new Error('cols or rows is required');
        }

        this.playedPieces = card.stamps ? card.stamps.filter(stamp => stamp.state === StampState.redeemed).length : 0;
        const availablePieces = card.stamps ? card.stamps.filter(stamp => stamp.state === StampState.issued).length : 0;
        this.availablePieces = Math.min(this.rows * this.cols - this.playedPieces, availablePieces);
        if (!card.displayProperties.cardImage) {
          throw new Error('cardImage is required');
        }

        this.image = card.displayProperties.cardImage.value.imageUrl;
        if (this.availablePieces === 0 && card.state === StampCardState.inactive) {
          this.notificationService.addPopup({
            title: 'Thank you!',
            text: 'Unfortunately, you have no pieces available.'
          });
          this.router.navigate(['/home']);
        }

        this.fetchCardsCount(card.campaignId);
      });
  }

  private fetchCard(): void {
    if (!this.campaignId) {
      throw new Error('campaignId is required');
    }

    this.currentCard(this.campaignId).subscribe(
      (card: IStampCard) => {
        if (!this.campaignId) {
          throw new Error('campaignId is required');
        }
        card.displayProperties.rewardPostStamp = 'assets/post-reward.png';
        card.displayProperties.rewardPreStamp = '/assets/pre-reward.png';
        card.displayProperties.preStampImg = '/assets/hsbc-prestamp.png';
        card.displayProperties.postStampImg = '/assets/hsbc-stamped.png';
        this.card = card;
        this.cardId = card.id;
        this.fetchStampTransactionCount(this.campaignId);
        this.fetchCardsCount(this.campaignId);
      }
    );
  }

  private fetchCardsCount(campaignId: number): void {
    if (campaignId === null) {
      return;
    }
    this.stampService.getCards(campaignId)
      .subscribe(
        (cards: IStampCard[]) => { this.cardsCount = cards.length; },
        () => { }
      );
  }

  private fetchStampTransactionCount(campaignId: number): void {
    this.stampService.getStamps(campaignId)
      .subscribe((stamps: IStamp[]) => {
        this.totalAvailablePieces = stamps.filter(stamp => stamp.state === StampState.issued).length;
      });
  }

  public onMoved(): void {
    if (!this.card || !this.card.stamps) {
      throw new Error('card or stamps is required');
    }

    const stamps = this.card.stamps.filter(s => s.state === StampState.issued);
    if (stamps.length === 0) {
      // don't do anything
      return;
    }
    const firstAvailableStamp = stamps[this.currentStampId];
    this.stampCard(firstAvailableStamp.id);
  }

  public async stampClicked(stamp: IStamp): Promise<void> {
    if (!this.card || !this.card.stamps) {
      throw new Error('card or stamps is required');
    }

    // build ordered list of stamps to be stamped
    const stamps: IStamp[] = this.card.stamps.filter(s => s.state === StampState.issued);
    for (const st of stamps) {
      await this.stampCard(st.id);
      if (st.id === stamp.id) {
        break;
      }
    }
  }

  public closeAndRedirect(url: string, didWin: boolean): void {
    if (didWin) {
      this.router.navigate([url, { win: true }]);
    } else {
      this.router.navigateByUrl(url);
    }
  }

  private stampCard(stampId: number): Promise<void> {
    return this.stampService.putStamp(stampId, this.sourceType)
      .toPromise()
      .then(
        (stamp: IStamp) => {
          if (stamp.state === StampState.redeemed) {
            if (!this.card || !this.card.stamps) {
              throw new Error('card or stamps is required');
            }

            if (!this.cols || !this.rows) {
              throw new Error('cols or rows is required');
            }

            const redeemedCard = this.card.stamps.map((cardStamp: IStamp) => {
              if (cardStamp.id === stampId) {
                return { ...cardStamp, state: StampState.redeemed };
              }
              return cardStamp;
            });
            this.card = { ...this.card, stamps: redeemedCard };

            if (this.card.cardNumber === this.cardsCount) { // we are on the last card
              if (!this.card || !this.card.stamps) {
                throw new Error('card or stamps is required');
              }

              const redeemedTransactionsCount = this.card.stamps.filter(s => s.state === StampState.redeemed).length;
              if (!this.card || !this.card.campaignConfig) {
                throw new Error('card or campaignConfig is required');
              }

              if (this.card.displayProperties.displayCampaignAs === 'stamp_card'
                && redeemedTransactionsCount === this.card.campaignConfig.totalSlots) {
                this.notificationService.addPopup({
                  // tslint:disable-next-line: max-line-length
                  text: 'Thank you for joining the HSBC Collect V2.0 Promo! You have already received the maximum number of stamps. Don\'t forget to redeem your earned rewards!'
                });
              } else if (this.card.displayProperties.displayCampaignAs === 'puzzle'
                && redeemedTransactionsCount === this.rows * this.cols) { // we also were on the last stamp
                this.notificationService.addPopup({
                  // tslint:disable-next-line: max-line-length
                  text: 'Thank you for joining the HSBC Collect V2.0 Promo! You have already received the maximum number of puzzle pieces. Don\'t forget to redeem your earned rewards!'
                });
              }
            }

            if (stamp.vouchers && stamp.vouchers.length > 0) {
              const voucherId = stamp.vouchers[0].id;
              const data: IRewardPopupConfig = {
                title: 'Congratulations!',
                text: 'Here is a reward for you.',
                imageUrl: 'assets/gift-image.svg',
                disableOverlayClose: true,
                url: `/voucher/${voucherId}`,
                afterClosedCallBackRedirect: this,
                didWin: this.sourceType === 'hsbc-collect2' ? true : false,
                buttonTxt: 'View Reward',
              };
              this.dialog.open(RewardPopupComponent, { data });
            }
          } else {
            if (!this.card || !this.card.stamps) {
              throw new Error('card or stamps is required');
            }

            const issuedLeft = this.card.stamps.filter(s => s.state === StampState.issued);
            if (issuedLeft.length === 0) {
              // all redeemed but no voucher
              const data: IRewardPopupConfig = {
                title: 'No Reward Received',
                text: 'Try again next time',
                disableOverlayClose: true,
                url: '/home',
                afterClosedCallBackRedirect: this,
                didWin: false,
                buttonTxt: 'Close',
              };
              this.dialog.open(RewardPopupComponent, { data });
            }
          }
          this.currentStampId++;
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
}
