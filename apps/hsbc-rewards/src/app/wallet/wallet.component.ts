import { Component } from '@angular/core';
import { INavLink } from '../shared/i-nav-link';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent {
  public navLinks: INavLink[] = [
    { path: 'my-reward/list', label: 'My Wallet' },
    { path: 'my-reward/history', label: 'History' }
  ];
}
