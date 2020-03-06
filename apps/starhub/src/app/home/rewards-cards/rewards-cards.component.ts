import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { IReward, RewardsService } from '@perx/core';
import { Observable } from 'rxjs';
import { MacaronService, IMacaron } from '../../services/macaron.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-rewards-cards',
  templateUrl: './rewards-cards.component.html',
  styleUrls: ['./rewards-cards.component.scss']
})
export class RewardsCardsComponent implements OnInit {
  public rewardsSnapping$: Observable<IReward[]>;
  public rewardsFeatured$: Observable<IReward[]>;

  @Output()
  public tapped: EventEmitter<IReward> = new EventEmitter<IReward>();

  constructor(
    private rewardsService: RewardsService,
    private macaronService: MacaronService
  ) {
  }

  public ngOnInit(): void {
    this.rewardsSnapping$ = this.rewardsService.getAllRewards(['snapping'])
      .pipe(
        map((rewards: IReward[]) => this.sortRewards(rewards))
      );
    this.rewardsFeatured$ = this.rewardsService.getAllRewards(['featured'])
      .pipe(
        map((rewards: IReward[]) => this.sortRewards(rewards))
      );
  }

  private sortRewards(rewards: IReward[]): IReward[] {
    return rewards.sort((a: IReward, b: IReward) => {
      if (!a.sellingFrom) { return 1; }
      if (!b.sellingFrom) { return -1; }
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
