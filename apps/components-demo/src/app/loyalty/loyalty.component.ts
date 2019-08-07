import { Component } from '@angular/core';
import { INavLink } from '../navlink.model';

@Component({
  selector: 'app-loyalty',
  templateUrl: './loyalty.component.html',
  styleUrls: ['./loyalty.component.scss']
})
export class LoyaltyComponent {
  public navLinks: INavLink[] = [
    { path: 'summary', label: 'Summary' },
    { path: 'transactions-list', label: 'Transactions List' }
  ];
}
