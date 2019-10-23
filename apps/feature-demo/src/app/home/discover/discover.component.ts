import {Component, OnInit} from '@angular/core';
import { ICategory } from '../../category.model';
import { Router } from '@angular/router';
import {IReward, ICatalog, IProfile, ILoyalty, LoyaltyService, ProfileService} from '@perx/core';
import {forkJoin, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
  selector: 'app-discover',
  templateUrl: './discover.component.html',
  styleUrls: ['./discover.component.scss']
})
export class DiscoverComponent implements OnInit {

  public profile: Observable<IProfile> | undefined;
  public loyalty: Observable<ILoyalty> | undefined;

  constructor(private router: Router,
              private loyaltyService: LoyaltyService, private profileService: ProfileService) {
  }

  public ngOnInit(): void {
    forkJoin(
      this.profileService.whoAmI(),
      this.loyaltyService.getLoyalties().pipe(
        map(loyalties => loyalties && loyalties.length > 0 && loyalties[0]))
    ).subscribe(
      ([profile, loyalty]) => {
        this.profile = of(profile);
        this.loyalty = of(loyalty);
      }
    );
  }

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
