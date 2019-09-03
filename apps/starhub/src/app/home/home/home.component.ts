import { Component, OnInit } from '@angular/core';
import { ILoyalty, LoyaltyService } from '@perx/core';

import { NoRenewaleInNamePipe } from '../no-renewale-in-name.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loyalty: ILoyalty;

  constructor(
    private noRenewalePipe: NoRenewaleInNamePipe,
    private loyaltyService: LoyaltyService
  ) { }

  public ngOnInit(): void {
    this.loyaltyService.getLoyalty().subscribe((loyalty: ILoyalty) => this.loyalty = loyalty);
  }

  public getBadge(tier: string | null): string {
    tier = tier !== null ? this.noRenewalePipe.transform(tier.toLowerCase()) : null;

    switch (tier) {
      case 'gold':
        return 'assets/gold-badge.png';

      case 'platinum':
        return 'assets/platinum-badge.png';
        break;

      case 'green':
      default:
        return 'assets/green-badge.png';
    }
  }

}
