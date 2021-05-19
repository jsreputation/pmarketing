import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { BadgeState, IBadge } from '@perxtech/core';
import { V4BadgeService } from 'libs/core/projects/perx-core/src/lib/badges/v4-badge.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'perx-core-badge-landing',
  templateUrl: './badge-landing.component.html',
  styleUrls: ['./badge-landing.component.scss'],
})
export class BadgeLandingComponent implements OnInit {
  public badges: Observable<IBadge[]>;

  constructor(private badgeService: V4BadgeService) { }

  public ngOnInit(): void {
    this.badges = this.badgeService.getBadgesByState();
  }

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    let state;
    if (tabChangeEvent.index) {
      state = tabChangeEvent.index > 1 ? BadgeState.unearned : BadgeState.earned;
    }
    this.badges = this.badgeService.getBadgesByState(state);
  }
}
