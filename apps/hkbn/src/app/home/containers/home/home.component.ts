import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IReward, ILoyalty, LoyaltyService, RewardsService } from '@perx/core';
import { Observable, of } from 'rxjs';
// import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'hkbn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loyalty: ILoyalty;
  public rewards$: Observable<IReward[]>;
  constructor(
    private router: Router,
    private loyaltyService: LoyaltyService,
    private rewardsService: RewardsService
  ) { }

  public goToReward(reward: IReward): void {
    this.router.navigate(['/reward', reward.id]);
  }

  public ngOnInit(): void {
    this.rewardsService.getAllRewards(['featured']).subscribe((rewards) => {
      this.rewards$ = of(rewards);
    });
    this.loyaltyService.getLoyalty()
      .subscribe(
        (loyalty: ILoyalty) => this.loyalty = loyalty
      );
  }
}
