import { Component, OnInit } from '@angular/core';
import { ILoyalty } from '@perx/core';

import { loyalty } from '../../loyalty.mock';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  public loyalty: ILoyalty;

  public ngOnInit(): void {
    this.loyalty = loyalty;
  }

  public getBadge(tier: string): string {
    let badge = 'assets/green-badge.png';

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
