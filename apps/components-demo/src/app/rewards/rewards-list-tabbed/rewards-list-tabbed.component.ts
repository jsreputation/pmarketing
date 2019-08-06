import { Component } from '@angular/core';

@Component({
  selector: 'app-rewards-list-tabbed',
  templateUrl: './rewards-list-tabbed.component.html',
  styleUrls: ['./rewards-list-tabbed.component.scss']
})
export class RewardsListTabbedComponent {

  constructor() {

  }

  public navLinks = [
    { path: 'hsbc', label: 'HSBC' },
    { path: 'others', label: 'others' },
  ];
}
