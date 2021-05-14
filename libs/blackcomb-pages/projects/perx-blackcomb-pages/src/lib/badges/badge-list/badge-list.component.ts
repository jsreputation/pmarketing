import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'perx-core-badge-list',
  templateUrl: './badge-list.component.html',
  styleUrls: ['./badge-list.component.scss'],
})
export class BadgeListComponent implements OnInit {
  private activeTabId: number = 0;

  constructor() { }

  public ngOnInit(): void { }

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.activeTabId = tabChangeEvent.index;
    console.log(this.activeTabId);
  }

}
