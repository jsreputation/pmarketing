import { Component } from '@angular/core';
import { IReward } from '@perx/core';
import { rewards } from '../rewards.mock';
import { Router } from '@angular/router';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent {
  public rewards: IReward[];

  constructor(private router: Router) {
    this.rewards = rewards;
  }

  public selected(reward: IReward): void {
    this.router.navigate(['/reward'], { queryParams: { id: reward.id } });
  }
}
