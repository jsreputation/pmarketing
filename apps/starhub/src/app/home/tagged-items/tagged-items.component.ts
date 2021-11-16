import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output
} from '@angular/core';

import {
  Observable,
  of,
  BehaviorSubject,
  combineLatest,
  forkJoin
  } from 'rxjs';

import {
  map,
  tap,
  catchError,
  switchMap,
  startWith,
  finalize,
  scan
 } from 'rxjs/operators';

import { trigger } from '@angular/animations';

import {
  fadeIn,
  fadeOut
} from '../../utils/fade-animations';

import {
  ConfigService,
  IReward,
  RewardsService,
  IStampCard,
  StampService,
  ICampaign,
  CampaignType,
  ICampaignService,
  IGame,
  IGameService,
  ITaggedItem,
  GameType,
  IFlags,
  SettingsService,
  IOperatingHours
} from '@perxtech/core';

import {
  IMacaron,
  MacaronService,
} from '../../services/macaron.service';

const REQ_PAGE_SIZE: number = 20;
const MIN_REWARD_LEN_LOAD_CAMPAIGN: number = 5;

interface ICampaignWithMacaron extends ICampaign {
  macaron?: IMacaron | null;
}

interface IRewardWithMacaron extends IReward {
  macaron?: IMacaron | null;
}

@Component({
  selector: 'app-tagged-items',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn())
  ],
  templateUrl: './tagged-items.component.html',
  styleUrls: ['./tagged-items.component.scss']
})
export class TaggedItemsComponent implements OnInit {

  public rewardsSnappingCompleted: boolean = false;
  public itemsSnapping$: Observable<(IRewardWithMacaron | ICampaignWithMacaron)[]>;
  private rewardsPageId: number = 0;
  public ghostItems: any[] = new Array(3);
  public taggedItemsSubj: BehaviorSubject<(IRewardWithMacaron | ICampaignWithMacaron)[]> = new BehaviorSubject([]);
  public campaignsPageId: number = 0;
  public campaignsEnded: boolean = false;
  public games: IGame[] = [];
  public stampCards: IStampCard[] = [];
  public showOperatingHours: boolean = false;


  @Input() public tagName: string;

  @Output()
  public tapped: EventEmitter<(ITaggedItem)> = new EventEmitter();

  constructor( private rewardsService: RewardsService,
               private configService: ConfigService,
               private campaignService: ICampaignService,
               private stampService: StampService,
               private gameService: IGameService,
               private macaronService: MacaronService,
               private settingsService: SettingsService) {
                 this.initTaggedItemsScan();
               }

  public ngOnInit(): void {
    this.configService.readAppConfig().subscribe(() => {
      this.initRewards();
    });
    this.settingsService.getRemoteFlagsSettings().subscribe(
      (flags: IFlags) => {
        this.showOperatingHours = flags.showHappyHourOperatingHours ? flags.showHappyHourOperatingHours : false;
      }
    );
  }

  private initTaggedItemsScan(): void {
    this.itemsSnapping$ = this.taggedItemsSubj
      .asObservable()
      .pipe(scan((acc, curr) => [...acc, ...(curr ? curr : [])], []));
  }

  private initRewards(): void {
    this.getTaggedRewards().subscribe((rewards: IReward[]) => {
      this.taggedItemsSubj.next(rewards);
      if (rewards.length < MIN_REWARD_LEN_LOAD_CAMPAIGN) {
        this.getTaggedCampaigns();
      }
    });
  }

  private sortRewards(rewards: IReward[]): IReward[] {
    return rewards.sort((a: IReward, b: IReward) => {
      if (! a.sellingFrom) {
        return 1;
      }
      if (! b.sellingFrom) {
        return -1;
      }
      return a.sellingFrom.getTime() - b.sellingFrom.getTime();
    });
  }

  public getTaggedRewards(): Observable<IRewardWithMacaron[]> {
    if (this.rewardsSnappingCompleted) {
      return of([]);
    }
    this.rewardsPageId++;
    return this.rewardsService.getRewards(this.rewardsPageId, REQ_PAGE_SIZE, [this.tagName], undefined)
      .pipe(
        tap((rewards: IReward[]) => {
          this.rewardsSnappingCompleted = rewards.length < REQ_PAGE_SIZE;
        }),
        map((rewards: IReward[]) => {
          const rewardswithMacaron: IRewardWithMacaron[]  = this.sortRewards(rewards);
          rewardswithMacaron.map((reward) => reward.macaron = this.getMacaron(reward));
          return rewardswithMacaron;
        }),
       finalize(() => this.ghostItems = [])
      );
  }

  public onTaggedItemsScroll(): void {
    if (!this.rewardsSnappingCompleted) {
      this.getTaggedRewards().subscribe(val => {
        this.taggedItemsSubj.next(val);
        if (val.length < REQ_PAGE_SIZE) {
          this.rewardsSnappingCompleted = true;
          if (!this.campaignsEnded) {
            this.getTaggedCampaigns();
          }
        }
      });
    } else {
        this.onTaggedCampaignsScroll();
    }
  }

  public getTaggedCampaigns(campaignPageSize: number = REQ_PAGE_SIZE): void {
    let tempCampaigns;
    let gameCampaigns: ICampaign[] = [];
    let stampCampaigns: ICampaign[] = [];
    this.campaignsPageId++;
    this.campaignService
      .getCampaigns({ page: this.campaignsPageId, tags: [this.tagName], size: campaignPageSize})
      .pipe(
        tap((campaigns) => {
           if (campaigns.length < campaignPageSize) {
               this.campaignsEnded = true;
            }
           tempCampaigns = campaigns;
           gameCampaigns = tempCampaigns.filter((campaign) => campaign.type === CampaignType.game);
           stampCampaigns = tempCampaigns.filter((campaign) => campaign.type === CampaignType.stamp);
            }),
        switchMap(() =>
          forkJoin(
              combineLatest(
               gameCampaigns.map(
                (campaign) => this.gameService.getGamesFromCampaign(campaign).pipe(catchError(() => of([])))
              )).pipe(startWith([]), map((games: IGame[][]) => [].concat(...(games as [])) as IGame[])),
             combineLatest(
              stampCampaigns.map((campaign) =>
                this.stampService.getCards(campaign.id).pipe(catchError(() => of([])))
              )).pipe( startWith([]), map((stampCards: IStampCard[][]) => [].concat(...(stampCards as [])) as IStampCard[]))
            ))
        ).subscribe(([games, stampCards]) => {
          this.games = this.games.concat(games);
          this.stampCards = this.stampCards.concat(stampCards);
          const filteredAndMacoronedCampaigns = tempCampaigns
            .filter((campaign) => {
              const currentDate = new Date();
              const isComingSoon =
                campaign.beginsAt &&
                campaign.beginsAt.getTime() > currentDate.getTime();
              return (
                 !([CampaignType.game, CampaignType.stamp].includes(campaign.type)) ||
                campaign.subType === GameType.survey || campaign.subType === GameType.quiz || isComingSoon ||
                ( campaign.type === CampaignType.game && games.filter((game) => game.campaignId === campaign.id).length > 0) ||
                ( campaign.type === CampaignType.stamp && stampCards.filter((stampCard) => stampCard.campaignId === campaign.id).length > 0)
              );
            }).map((campaign) => {
              campaign.macaron = this.getMacaron(campaign);
              return campaign;
            });
          this.taggedItemsSubj.next(filteredAndMacoronedCampaigns);
        }
      );
  }


  public onTaggedCampaignsScroll(): void {
    if (this.campaignsEnded) {
      return;
    }
    this.getTaggedCampaigns();
  }

  public getMacaron(taggedItem: ICampaign | IReward): IMacaron | null {

    if ('type' in taggedItem  &&  (taggedItem.type in CampaignType)) {
      return this.macaronService.getCampaignMacaron(<ICampaign> taggedItem);
    }
    return this.macaronService.getMacaron(<IReward> taggedItem);
  }

  public selected(taggedItem: (ICampaign | IReward)): void {
    if ('type' in taggedItem &&  (taggedItem.type in CampaignType)) {
      if (taggedItem.type === CampaignType.game && taggedItem.subType !== GameType.quiz && taggedItem.subType !== GameType.survey) {
        this.gameSelected(taggedItem);
      } else if (taggedItem.subType === GameType.quiz || taggedItem.subType === GameType.survey) {
          const campaignSubType: string = taggedItem.subType ? taggedItem.subType : '';
          this.tapped.emit({ itemType: campaignSubType, itemVal: taggedItem });
      } else {
        this.tapped.emit({ itemType: taggedItem.type, itemVal: taggedItem });
      }
    } else {
      this.tapped.emit({ itemType: 'reward', itemVal: taggedItem });
    }
  }

  public gameSelected(campaign: ICampaignWithMacaron): void {
    if (campaign.macaron && campaign.macaron.class === 'coming-soon') {
      return;
    }
    const gameWithCampaign = this.games.find(
      (game) => game.campaignId === campaign.id
    );

    if (gameWithCampaign) {
      this.tapped.emit({ itemType: CampaignType.game, itemVal: gameWithCampaign.id });
    }
  }

  public getOperatingHours(operatingHours: IOperatingHours, campaignType: string): string {

    const daysMapArr = [ false, false, false, false, false, false, false ]; // index 0 is sunday

    for (const dayIndex in operatingHours.days) {
      if (dayIndex) { // guard-for-in
        daysMapArr[operatingHours.days[dayIndex]] = true;
      }
    }
    const days: string = this.dayArrToIntuitiveStringDayRange(daysMapArr);
    const hours: string = `${operatingHours.opensAt?.substr(0, 5)} - ${operatingHours.closesAt?.substr(0, 5)}`;
    const operatingHoursText = campaignType === 'game' ? 'Campaign available during:' : 'Collect a voucher during:';
    return `${operatingHoursText} ${days}, ${hours} ${operatingHours.formattedOffset}`;
  }

  private dayOfWeekAsString(dayIndex: number): string {
    return [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ][dayIndex];
  }

  // works but can't wrap sat and sun
  private dayArrToIntuitiveStringDayRange(daysMapArr: boolean[]): string {
    let dayRange = '', multiDayRange = '';
    let findingRange = false;

    for (let i = 0; i <= daysMapArr.length; i++) {
      if (daysMapArr[i]) {
        if (dayRange.length > 0 && !findingRange) {
          findingRange = true;
        } else if (dayRange.length === 0) { // first item in current range.
          dayRange = `${this.dayOfWeekAsString(i)}`;
        }
      } else if (dayRange.length > 0 && ! daysMapArr[i]) { // first part of range already identified
        if (this.dayOfWeekAsString(i - 1) !== dayRange) {
          dayRange = `${dayRange} - ${this.dayOfWeekAsString(i - 1)}`;
        }
        if (multiDayRange.length === 0) {
          multiDayRange = dayRange;
        } else {
          multiDayRange = `${multiDayRange}, ${dayRange}`;
        }
        dayRange = ''; // reset for more ranges;
        findingRange = false;
      }
    }
    return multiDayRange;
  }

}
