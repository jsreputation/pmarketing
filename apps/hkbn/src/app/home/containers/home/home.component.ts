import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IReward, ILoyalty, LoyaltyService } from '@perx/core';
// import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'hkbn-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loyalty: ILoyalty;
  constructor(
    private router: Router,
    private loyaltyService: LoyaltyService
  ) { }

  public goToReward(reward: IReward): void {
    this.router.navigate(['/reward', reward.id]);
  }

  public ngOnInit(): void {
    this.loyaltyService.getLoyalty()
      .subscribe(
        (loyalty: ILoyalty) => this.loyalty = loyalty
      );
  }
}
