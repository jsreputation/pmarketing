import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { IReward, RewardsService } from '@perx/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-rewards-cards',
  templateUrl: './rewards-cards.component.html',
  styleUrls: ['./rewards-cards.component.scss']
})
export class RewardsCardsComponent implements OnInit {
  public rewards: Observable<IReward[]>;

  @Output()
  public tapped: EventEmitter<IReward> = new EventEmitter<IReward>();

  constructor(
    private rewardsService: RewardsService
  ) {
  }

  public ngOnInit(): void {
    this.rewards = this.rewardsService.getAllRewards(['featured'])
      .pipe(
        map((rewards: IReward[]) => rewards.sort((a: IReward, b: IReward) => {
          if (!a.sellingFrom) { return 1; }
          if (!b.sellingFrom) { return -1; }
          return a.sellingFrom.getTime() - b.sellingFrom.getTime();
        }))
      );
  }

  public selected(reward: IReward): void {
    this.tapped.emit(reward);
  }

  public isComingSoon(validFromDate: Date): boolean {
    const currentDate = new Date();
    const timeDifference = validFromDate.getTime() - currentDate.getTime();
    return timeDifference > 0;
  }

  public isExpiring(validToDate: Date): boolean {
    const currentDate = new Date();
    const timeDifference = validToDate.getTime() - currentDate.getTime();
    const differenceInHours = Math.abs(timeDifference / 1000 / 60 / 60);

    return differenceInHours <= 36;
  }
}
