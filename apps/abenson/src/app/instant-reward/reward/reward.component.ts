import { Component, OnInit } from '@angular/core';
import { iif, Observable } from 'rxjs';
import { RewardsService, IReward, PopupComponent } from '@perxtech/core';
import { MatDialog } from '@angular/material/dialog';
import { tap, finalize, map } from 'rxjs/operators';

@Component({
  selector: 'app-reward',
  templateUrl: './reward.component.html',
  styleUrls: ['./reward.component.scss']
})
export class RewardComponent implements OnInit {
  public title: string = 'Headline';
  public subTitle: string = 'Sub-Headline';
  public favDisabled: boolean  = false;

  public rewards$: Observable<IReward[]>;

  constructor(
    private rewardsService: RewardsService,
    private dialog: MatDialog,
  ) {
  }

  public ngOnInit(): void {
    this.getRewards();
  }

  public getRewards(): void {
    this.rewards$ = this.rewardsService.getAllRewards();
  }

  public rewardClickedHandler(reward: IReward): void {
    const data = {
      title: 'Clicked!',
      text: `ID: ${reward.id}\n` +
        `Reward Name: ${reward.name}`,
    };
    this.dialog.open(PopupComponent, { data });
  }

  public rewardFavoriteHandler(rewardToggled: IReward): void {
    if (this.favDisabled) {
      return;
    }

    this.favDisabled = true;

    iif(() => (rewardToggled && (rewardToggled.favorite || false)),
    this.rewardsService.unfavoriteReward(rewardToggled.id),
    this.rewardsService.favoriteReward(rewardToggled.id)).pipe(
      tap(
        rewardChanged => {
          this.rewards$ = this.rewards$.pipe(
            map(rewards => {
              const foundIndex = rewards.findIndex(reward => reward.id === rewardToggled.id);
              rewards[foundIndex] = rewardChanged;
              return rewards;
            })
          );
        }
      ),
      finalize(() => setTimeout(() => {
        this.favDisabled = false;
      }, 500))
    ).subscribe();
  }
}
