import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';
import {
  MatSlider,
  MatCheckboxChange,
} from '@angular/material';

import { combineLatest, from, Observable } from 'rxjs';
import { startWith, tap, flatMap, map, mergeMap, toArray } from 'rxjs/operators';

import {
  PuzzleCollectStamp,
  PuzzleCollectStampState,
  PuzzleCollectReward,
  ConfigService,
  IConfig,
  IStampCard,
  ThemesService,
  ITheme,
  ICampaignService,
  CampaignType,
  StampService,
  ICampaign,
  StampState,
  IStamp,
  StampCardState,
  NotificationService,
} from '@perx/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
  public stamps: PuzzleCollectStamp[];
  public rewardArr: PuzzleCollectReward[];
  public availStamps: number;
  public stampsRedeemedNumber: number;
  public showCounter: boolean = false;

  public campaignId: number | null | undefined = null;
  private cardId: number | null = null;
  private card: IStampCard | null = null;

  public preStampImg: string | undefined;
  public postStampImg: string | undefined;
  public rewardPreStamp: string | undefined;
  public rewardPostStamp: string | undefined;
  public availableStampImg: string | undefined;
  public availableRewardImg: string | undefined;
  public backgroundImage: string | undefined;
  public cardBgImage: string | undefined;

  public playedPieces: number = 0;
  private displayCampaignAs: string = 'puzzle';
  public rows: number | undefined = 2;
  public cols: number | undefined = 3;
  public availablePieces: number = 0;
  public totalAvailablePieces: number = 0;
  public image: string = '';
  @ViewChild('nbStamps', { static: true }) public nbStamps: MatSlider;
  @ViewChild('nbStampsRedeemed', { static: true }) public nbStampsRedeemed: MatSlider;

  private updateRewards(event: MatCheckboxChange): void {
    const sourceIdStr: string = event.source.id;
    const checkboxIdStr: string = sourceIdStr.substr(sourceIdStr.lastIndexOf('-') + 1);
    const rewardPosition: number = +checkboxIdStr;
    if (event.checked) {
      this.rewardArr.push({ rewardPosition });
    } else {
      this.rewardArr = this.rewardArr.filter(reward => reward.rewardPosition !== rewardPosition);
    }
  }

  constructor(
    private configService: ConfigService,
    private themesService: ThemesService,
    private campaignService: ICampaignService,
    private stampService: StampService,
    private notificationService: NotificationService,
    private router: Router,

  ) {
    this.stamps = [];
    this.rewardArr = [];
    this.availStamps = 0;
  }

  public ngOnInit(): void {
    this.configService.readAppConfig()
      .pipe(
        tap(() => {
          if (this.campaignId === null) {
            this.fetchCampaign();
          } else if (this.cardId === null || this.card === null) {
            this.fetchCard();
          }
        }),
        flatMap((config: IConfig) => this.themesService.getThemeSetting(config))
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
    combineLatest(
      this.nbStampsRedeemed.valueChange.pipe(startWith(0)),
      this.nbStamps.valueChange
    )
      .subscribe(([valueRedeemed, valuenbStamps]) => {
        this.stampsRedeemedNumber = valueRedeemed as number;
        this.stamps = Array(valuenbStamps)
          .fill(0)
          .map((_, index) => ({
            id: ++index,
            state: index <= this.stampsRedeemedNumber ? PuzzleCollectStampState.redeemed : PuzzleCollectStampState.issued
          }));
      });
  }

  public checkboxOnChange(event: MatCheckboxChange): void {
    this.updateRewards(event);
  }

  // helper function for rendering # slots using ngFor
  public arrayFromNumber(n: number): any[] {
    return Array(n);
  }

  public toggleShow(): void {
    this.showCounter = !this.showCounter;
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
          throw new Error(`card or campaignId is required`);
        }

        this.fetchStampTransactionCount(card.campaignId);
        this.cardId = card.id;
        this.card = card;
        this.cols = card.displayProperties.numberOfCols;
        this.rows = card.displayProperties.numberOfRows;
        if (!this.cols || !this.rows) {
          throw new Error(`cols or rows is required`);
        }

        this.playedPieces = card.stamps ? card.stamps.filter(stamp => stamp.state === StampState.redeemed).length : 0;
        const availablePieces = card.stamps ? card.stamps.filter(stamp => stamp.state === StampState.issued).length : 0;
        this.availablePieces = Math.min(this.rows * this.cols - this.playedPieces, availablePieces);
        if (!card.displayProperties.cardImage) {
          throw new Error(`cardImage is required`);
        }

        this.image = card.displayProperties.cardImage.value.imageUrl;
        if (this.availablePieces === 0 && card.state === StampCardState.inactive) {
          this.notificationService.addPopup({
            title: 'Thank you!',
            text: 'Unfortunately, you have no pieces available.'
          });
          this.router.navigate(['/home']);
        }
      });
  }

  private fetchCard(): void {
    if (!this.campaignId) {
      throw new Error(`campaignId is required`);
    }

    this.currentCard(this.campaignId).subscribe(
      (card: IStampCard) => {
        if (!this.campaignId) {
          throw new Error(`campaignId is required`);
        }

        this.card = card;
        this.cardId = card.id;
        this.fetchStampTransactionCount(this.campaignId);
      }
    );
  }


  private fetchStampTransactionCount(campaignId: number): void {
    this.stampService.getStamps(campaignId)
      .subscribe((stamps: IStamp[]) => {
        this.totalAvailablePieces = stamps.filter(stamp => stamp.state === StampState.issued).length;
      });
  }

  private currentCard(campaignId: number): Observable<IStampCard> {
    return this.stampService.getCurrentCard(campaignId);
  }
}
