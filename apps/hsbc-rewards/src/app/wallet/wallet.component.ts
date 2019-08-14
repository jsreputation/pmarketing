import { Component } from '@angular/core';
import { INavLink } from '../shared/i-nav-link';

@Component({
  selector: 'app-wallet',
  templateUrl: './wallet.component.html',
  styleUrls: ['./wallet.component.scss']
})
export class WalletComponent {
  navLinks: INavLink[] = [
    { path: 'list', label: 'List' },
    { path: 'history', label: 'History' }
  ];
}
