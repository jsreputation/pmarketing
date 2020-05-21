import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {
  ConfigService,
  IReward,
  RewardsService,
} from '@perxtech/core';
import {
  Observable,
  of
} from 'rxjs';
import { MacaronService, IMacaron } from '../../services/macaron.service';
import {
  finalize,
  map,
  tap
} from 'rxjs/operators';
import { trigger } from '@angular/animations';
import { fadeIn, fadeOut } from '../../utils/fade-animations';

const REQ_PAGE_SIZE: number = 10;

@Component({
  selector: 'app-rewards-cards',
  animations: [
    trigger('fadeOut', fadeOut()),
    trigger('fadeIn', fadeIn())
  ],
  templateUrl: './rewards-cards.component.html',
  styleUrls: ['./rewards-cards.component.scss']
})
export class RewardsCardsComponent implements OnInit {
  private currentRewardsSnappingPage: number = 0;
  private currentRewardsFeaturedPage: number = 0;
  private rewardsSnappingCompleted: boolean = false;
  private rewardsFeaturedCompleted: boolean = false;
  public rewardsSnapping$: Observable<IReward[]>;
  public rewardsFeatured$: Observable<IReward[]>;
  public ghostRewardsSnapping: any[] = new Array(3); // 3 to cover screen width while loading
  public ghostRewardsFeatured: any[] = new Array(3); // 3 to cover screen width while loading

  @Output()
  public tapped: EventEmitter<IReward> = new EventEmitter<IReward>();

  constructor(
    private rewardsService: RewardsService,
    private macaronService: MacaronService,
    private configService: ConfigService
  ) {
  }

  public ngOnInit(): void {
    this.configService.readAppConfig().subscribe(() => {
      this.initRewards();
    });
  }

  private initRewards(): void {
    this.getRewardsSnapping().subscribe((rewards: IReward[]) => {
      this.rewardsSnapping$ = of(rewards);
    });
    this.getRewardsFeatured().subscribe((rewards: IReward[]) => {
      this.rewardsFeatured$ = of(rewards);
    });
  }

  private sortRewards(rewards: IReward[]): IReward[] {
    return rewards.sort((a: IReward, b: IReward) => {
      if (!a.sellingFrom) {
        return 1;
      }
      if (!b.sellingFrom) {
        return -1;
      }
      return a.sellingFrom.getTime() - b.sellingFrom.getTime();
    });
  }

  public getMacaron(reward: IReward): IMacaron | null {
    return this.macaronService.getMacaron(reward);
  }

  public selected(reward: IReward): void {
    this.tapped.emit(reward);
  }

  public getRewardsSnapping(): Observable<IReward[]> {
    if (this.rewardsSnappingCompleted) {
      return of([]);
    }
    this.currentRewardsSnappingPage++;
    return this.rewardsService.getRewards(this.currentRewardsSnappingPage, REQ_PAGE_SIZE, ['snapping'], undefined)
      .pipe(
        tap((rewards: IReward[]) => this.rewardsSnappingCompleted = rewards.length < REQ_PAGE_SIZE),
        map((rewards: IReward[]) => this.sortRewards(rewards)),
        finalize(() => this.ghostRewardsSnapping = [])
      );
  }

  public getRewardsFeatured(): Observable<IReward[]> {
    if (this.rewardsFeaturedCompleted) {
      return of([]);
    }
    this.currentRewardsFeaturedPage++;
    return this.rewardsService.getRewards(this.currentRewardsFeaturedPage, REQ_PAGE_SIZE, ['featured'], undefined)
      .pipe(
        tap((rewards: IReward[]) => this.rewardsFeaturedCompleted = rewards.length < REQ_PAGE_SIZE),
        map((rewards: IReward[]) => this.sortRewards(rewards)),
        tap((rewards: IReward[]) => this.sortRewards(rewards)),
        finalize(() => this.ghostRewardsFeatured = [])
      );
  }
}
