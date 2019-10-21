import { Component } from '@angular/core';
import { ICategory } from '../../category.model';
import { Router } from '@angular/router';
import { IReward, ICatalog } from '@perx/core';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent {

  constructor(private router: Router) { }

  public categorySelected(category: ICategory): void {
    this.router.navigate(['/category'], { queryParams: { category: category.name } });
  }

  public rewardSelected(reward: IReward): void {
    this.router.navigate(['/reward'], { queryParams: { id: reward.id } });
  }

  public catalogSelected(catalog: ICatalog): void {
    this.router.navigate(['/category'], { queryParams: { catalog: catalog.id } });
  }

  public campaignSelected(gameId: number): void {
    this.router.navigate(['/game'], { queryParams: { id: gameId } });
  }
}
