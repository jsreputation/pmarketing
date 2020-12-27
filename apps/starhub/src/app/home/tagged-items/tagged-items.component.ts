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
  ITaggedItem
} from '@perxtech/core';

import {
  IMacaron,
  MacaronService,
} from '../../services/macaron.service';

const REQ_PAGE_SIZE: number = 2;

interface ICampaignWithMacaron extends ICampaign {
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
  public itemsSnapping$: Observable<(IReward | ICampaign)[]>;
  private currentRewardsSnappingPage: number = 0;
  public ghostItems: any[] = new Array(3);
  public taggedItemsSubj: BehaviorSubject<(IReward |ICampaign)[]> = new BehaviorSubject([]);
  public campaignsPageId: number = 1;
  public campaignsEnded: boolean = false;
  public games: IGame[];
  public stampCards: IStampCard[];

  @Input() public tagName: string;

  @Output()
  public tapped: EventEmitter<(ITaggedItem)> = new EventEmitter();

  constructor( private rewardsService: RewardsService,
               private configService: ConfigService,
               private campaignService: ICampaignService,
               private stampService: StampService,
               private gameService: IGameService,
               private macaronService: MacaronService) {
                 this.initTaggedItemsScan();
               }

  public ngOnInit(): void {
    this.configService.readAppConfig().subscribe(() => {
      this.getTaggedRewards().subscribe((rewards: IReward[]) => {
        this.taggedItemsSubj.next(rewards);
      });
    });
  }

  private initTaggedItemsScan(): void {
    this.itemsSnapping$ = this.taggedItemsSubj
      .asObservable()
      .pipe(scan((acc, curr) => [...acc, ...(curr ? curr : [])], []));
  }

  public sortRewards(rewards: IReward[]): IReward[] {
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

  public getTaggedRewards(): Observable<IReward[]> {
    if (this.rewardsSnappingCompleted) {
      return of([]);
    }
    this.currentRewardsSnappingPage++;
    return this.rewardsService.getRewards(this.currentRewardsSnappingPage, REQ_PAGE_SIZE, [this.tagName], undefined)
      .pipe(
        tap((rewards: IReward[]) => {
          this.rewardsSnappingCompleted = rewards.length < REQ_PAGE_SIZE;
        }),
        map((rewards: IReward[]) => this.sortRewards(rewards)),
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
            this.getTaggedCampaigns(REQ_PAGE_SIZE - val.length);
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
    this.campaignService
      .getCampaigns({ page: this.campaignsPageId, tagged_with: this.tagName, size: campaignPageSize})
      .pipe(
        tap((campaigns) => {
           if (campaigns.length < campaignPageSize) {
              // actual check here if no more campaigns then end -> ensure all pages combed
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
          this.games = games;
          this.stampCards = stampCards;
          const filteredAndMacoronedCampaigns = tempCampaigns
            .filter((campaign) => {
              const currentDate = new Date();
              const isComingSoon =
                campaign.beginsAt &&
                campaign.beginsAt.getTime() > currentDate.getTime();
              return (
                 !([CampaignType.game, CampaignType.stamp].includes(campaign.type)) || isComingSoon ||
                ( campaign.type === CampaignType.game && games.filter((game) => game.campaignId === campaign.id).length > 0) ||
                ( campaign.type === CampaignType.stamp && stampCards.filter((stampCard) => stampCard.campaignId === campaign.id).length > 0)
              );
            });
          this.taggedItemsSubj.next(filteredAndMacoronedCampaigns);
        }
      );
  }


  public onTaggedCampaignsScroll(): void {
    if (this.campaignsEnded) {
      return;
    }
    this.campaignsPageId++;
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
      if (taggedItem.type === CampaignType.game) {
        this.gameSelected(taggedItem);
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
      this.tapped.emit({ itemType: CampaignType.game, itemVal: gameWithCampaign.id});
    }
  }

}
