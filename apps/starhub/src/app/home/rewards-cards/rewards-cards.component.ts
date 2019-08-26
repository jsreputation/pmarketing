import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { IReward, RewardsService } from '@perx/core';
import { Observable } from 'rxjs';

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
    this.rewards = this.rewardsService.getAllRewards();
  }

  public selected(reward: IReward): void {
    this.tapped.emit(reward);
  }

  public getMacaron(validDateTo: string): string {
    const currentDate = new Date().getTime();
    const validTo = new Date(validDateTo);
    const timeDifference = validTo.valueOf() - currentDate.valueOf();
    const differenceInHours = Math.abs(timeDifference / 1000 / 60 / 60);

    if (differenceInHours <= 36) {
      return 'expiring';
    }

    return '';
  }
}
