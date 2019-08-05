import { Component } from '@angular/core';
import { INavLink } from '../navlink.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  public navLinks: INavLink[] = [
    { path: 'rewards', label: 'Rewards' },
    { path: 'utils', label: 'Utils' },
    { path: 'charts', label: 'Charts' },
    { path: 'games', label: 'Games' },
    { path: 'stamps', label: 'Stamps' },
    { path: 'login', label: 'Login' },
    { path: 'voucher', label: 'Vouchers' }
  ];
}
