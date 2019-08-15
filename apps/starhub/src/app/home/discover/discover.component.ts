import { Component } from '@angular/core';
import { ICategory } from '../categories/categories.component';
import { Router } from '@angular/router';
import { IReward, ICampaign } from '@perx/core';
import { Catalog } from '../catalogs/catalogs.component';

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

  public catalogSelected(catalog: Catalog): void {
    this.router.navigate(['/category'], { queryParams: { catalog: catalog.title } });
  }

  // @ts-ignore
  public campaignSelected(campaign: ICampaign): void {
    // todo
  }
}
