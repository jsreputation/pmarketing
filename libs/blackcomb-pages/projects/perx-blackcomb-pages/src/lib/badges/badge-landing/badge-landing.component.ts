import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { IBadge, IBadgeService } from '@perxtech/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'perx-core-badge-landing',
  templateUrl: './badge-landing.component.html',
  styleUrls: ['./badge-landing.component.scss'],
})
export class BadgeLandingComponent implements OnInit {
  public badges: Observable<IBadge[]>;

  constructor(private badgeService: IBadgeService) { }

  public ngOnInit(): void {
    this.badges = this.badgeService.getAllBadges();
  }

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    console.log(tabChangeEvent);
    // let state;
    // if (tabChangeEvent.index) {
    //   state = tabChangeEvent.index > 1 ? BadgeState.unearned : BadgeState.earned;
    // }
    // this.badges = this.badgeService.getBadgesByState(state);
  }
}
