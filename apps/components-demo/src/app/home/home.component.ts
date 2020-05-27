import { Component } from '@angular/core';
import { INavLink } from '../navlink.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public navLinks: INavLink[] = [
    { path: 'rewards', label: 'Rewards', icon: 'card_giftcard' },
    { path: 'utils', label: 'Utils', icon: 'build' },
    { path: 'games', label: 'Games', icon: 'games' },
    { path: 'stamps', label: 'Stamps' },
    { path: 'login', label: 'Login' },
    { path: 'voucher', label: 'Vouchers' },
    { path: 'location', label: 'Locations', icon: 'map' },
    { path: 'loyalty', label: 'Loyalty', icon: 'loyalty' },
    { path: 'survey', label: 'Survey' },
    { path: 'pages', label: 'Pages', icon: 'web' },
    { path: 'quiz', label: 'Quiz', icon: 'touch_app' }
  ];
}
