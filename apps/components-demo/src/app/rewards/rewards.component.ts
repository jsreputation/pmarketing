import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent {
  public navLinks = [
    { path: 'collection', label: 'Collection' },
    { path: 'list', label: 'List' },
    { path: 'list-tabbed', label: 'List-Tabbed' },
    { path: 'detail', label: 'Detail' },
  ];
}
