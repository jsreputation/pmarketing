import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { ConfigService, IReward, RewardsService } from '@perxtech/core';
import { Observable } from 'rxjs';
import { MacaronService, IMacaron } from '../../services/macaron.service';
import { finalize, map } from 'rxjs/operators';
import { trigger } from '@angular/animations';
import { fadeIn, fadeOut } from '../../utils/fade-animations';

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
      this.rewardsSnapping$ = this.rewardsService.getAllRewards(['snapping'])
        .pipe(
          map((rewards: IReward[]) => this.sortRewards(rewards)),
          finalize(() => this.ghostRewardsSnapping = [])
        );
      this.rewardsFeatured$ = this.rewardsService.getAllRewards(['featured'])
        .pipe(
          map((rewards: IReward[]) => this.sortRewards(rewards)),
          finalize(() => this.ghostRewardsFeatured = [])
        );
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
}
