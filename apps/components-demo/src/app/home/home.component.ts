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
    { path: 'utils', label: 'Utils' },
    { path: 'charts', label: 'Charts', icon: 'bar_chart' },
    { path: 'games', label: 'Games', icon: 'games' },
    { path: 'stamps', label: 'Stamps' },
    { path: 'login', label: 'Login' },
    { path: 'voucher', label: 'Vouchers' },
    { path: 'location', label: 'Locations', icon: 'map' },
    { path: 'loyalty', label: 'Loyalty' },
    { path: 'survey', label: 'Survey' },
    { path: 'pages', label: 'Pages' },
    { path: 'candyshop', label: 'Candy Shop' },
    { path: 'quiz', label: 'Quiz', icon: 'touch_app' }
  ];
}
