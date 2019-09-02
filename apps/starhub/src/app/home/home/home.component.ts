import { Component, OnInit } from '@angular/core';
import { ILoyalty } from '@perx/core';

import { loyalty } from '../../loyalty.mock';
import { NoRenewaleInNamePipe } from '../no-renewale-in-name.pipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loyalty: ILoyalty;

  constructor(
    private noRenewalePipe: NoRenewaleInNamePipe
  ) { }

  public ngOnInit(): void {
    this.loyalty = loyalty;
  }

  public getBadge(tier: string): string {
    let badge = 'assets/green-badge.png';
    tier = this.noRenewalePipe.transform(tier.toLowerCase());

    switch (tier) {
      case 'green':
        badge = 'assets/green-badge.png';
        break;

      case 'gold':
        badge = 'assets/gold-badge.png';
        break;

      case 'platinum':
        badge = 'assets/platinum-badge.png';
        break;

      default:
        break;
    }
    return badge;
  }

}
