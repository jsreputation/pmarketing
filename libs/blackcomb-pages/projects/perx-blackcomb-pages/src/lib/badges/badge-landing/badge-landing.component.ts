import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'perx-core-badge-landing',
  templateUrl: './badge-landing.component.html',
  styleUrls: ['./badge-landing.component.scss'],
})
export class BadgeLandingComponent implements OnInit {
  private activeTabId: number = 0;

  constructor() { }

  public ngOnInit(): void { }

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    this.activeTabId = tabChangeEvent.index;
    console.log(this.activeTabId);
  }

}
