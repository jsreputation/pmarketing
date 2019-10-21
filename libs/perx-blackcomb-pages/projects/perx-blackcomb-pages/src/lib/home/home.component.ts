import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { Router } from '@angular/router';

import {
  Observable,
  BehaviorSubject,
  forkJoin,
  of,
  Subject,
} from 'rxjs';
import {
  tap,
  takeUntil,
  map,
  scan,
} from 'rxjs/operators';

import {
  ICampaignService,
  ICampaign,
  RewardsService,
  IReward,
  ITabConfigExtended,
} from '@perx/core';

const stubTabs: ITabConfigExtended[] = [
  {
    filterKey: null,
    filterValue: null,
    tabName: 'ALL',
    rewardsList: null,
    rewardsType: null
  }
  , {
    filterKey: null,
    filterValue: null,
    tabName: 'Food & Beverage',
    rewardsList: null,
    rewardsType: 'Food & Beverage'
  }, {
    filterKey: null,
    filterValue: null,
    tabName: 'Travel',
    rewardsList: null,
    rewardsType: 'Travel'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Electronics',
    rewardsList: null,
    rewardsType: 'Electronics'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Wellness',
    rewardsList: null,
    rewardsType: 'Wellness'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Entertainment',
    rewardsList: null,
    rewardsType: 'Entertainment'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Shopping',
    rewardsList: null,
    rewardsType: 'Shopping'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Merchant Self',
    rewardsList: null,
    rewardsType: 'Merchant Self'
  },
  {
    filterKey: null,
    filterValue: null,
    tabName: 'Others',
    rewardsList: null,
    rewardsType: 'Others'
  },
];

const CAMPAIGN_CHUNK_SIZE = 2;

@Component({
  selector: 'perx-blackcomb-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, OnDestroy {
  private destroy$: Subject<any> = new Subject();
  private campaign: BehaviorSubject<ICampaign[]> = new BehaviorSubject<ICampaign[]>([]);
  private dataCampaigns: ICampaign[] = null;
  private chunkCampaignsId: number = 0;
  private chunkCampaigns: any[] = null;

  public originCampaign$: Observable<ICampaign[]>;
  public campaign$: Observable<ICampaign[]>;
  public rewards$: Observable<IReward[]>;
  public tabs$: BehaviorSubject<ITabConfigExtended[]> = new BehaviorSubject<ITabConfigExtended[]>([]);
  public staticTab: ITabConfigExtended[];

  public get chunkCampaignsEnded(): boolean {
    return this.chunkCampaigns ? this.chunkCampaignsId >= this.chunkCampaigns.length : false;
  }

  private downloadCampaigns(): void {
    this.originCampaign$ = forkJoin(this.campaingService.getCampaigns())
      .pipe(
        map((arrCampaigns: ICampaign[][]) => arrCampaigns[0])
      );
    this.originCampaign$.subscribe((campaigns: ICampaign[]) => {
      this.dataCampaigns = campaigns;
      this.chunkCampaigns = this.chunkArr(this.dataCampaigns, CAMPAIGN_CHUNK_SIZE);
      this.nextCampaigns();
    });
  }

  private chunkArr(array: any, size: number): any {
    const chunkedArr = [];
    let index = 0;
    while (index < array.length) {
      chunkedArr.push(array.slice(index, size + index));
      index += size;
    }
    return chunkedArr;
  }

  private initCampaign$(): void {
    this.campaign$ = this.campaign.asObservable().pipe(
      scan((acc, curr) => [...acc, ...curr ? curr : []]
      , [])
    );
  }

  constructor(
    private campaingService: ICampaignService,
    private rewardsService: RewardsService,
    private router: Router
  ) {
    this.initCampaign$();
  }

  public ngOnInit(): void {
    this.downloadCampaigns();
    this.rewards$ = this.rewardsService.getAllRewards(['featured']);
    this.staticTab = stubTabs;
    this.getTabedList();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getTabedList(): void {
    this.tabs$.next(this.staticTab);
    forkJoin(this.staticTab.map((tab) =>
      this.rewardsService.getAllRewards(null, tab.rewardsType ? [tab.rewardsType] : null)
        .pipe(
          tap((reward) => {
            tab.rewardsList = of(reward);
            this.tabs$.next(this.staticTab);
          }),
          takeUntil(this.destroy$)
        )
    )).subscribe(() => {
      this.tabs$.next(this.staticTab);
    });
  }

  public goToReward(reward: IReward): void {
    this.router.navigate([`/reward-detail/${reward.id}`]);
  }

  public nextCampaigns(): void {
    if (this.chunkCampaignsEnded) {
      return;
    }

    this.campaign.next(this.chunkCampaigns[this.chunkCampaignsId]);
    ++this.chunkCampaignsId;
  }
}
