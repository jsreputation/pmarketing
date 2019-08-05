import { Component } from '@angular/core';
import { INavLink } from '../navlink.model';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent {
  public navLinks: INavLink[] = [
    { path: 'collection', label: 'Collection' },
    { path: 'list', label: 'List' },
    { path: 'detail', label: 'Detail' },
  ];
}
