import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { IBadge, IBadgeService } from '@perxtech/core';
import { iif } from 'rxjs';

@Component({
  selector: 'perx-core-badge-landing',
  templateUrl: './badge-landing.component.html',
  styleUrls: ['./badge-landing.component.scss'],
})
export class BadgeLandingComponent implements OnInit {
  public badges: IBadge[];
  private pageNumber: number = 2;
  private paginationComplete: boolean = false;
  private selectedFilter: number = 0;

  constructor(private badgeService: IBadgeService) { }

  public ngOnInit(): void {
    this.badgeService.getAllBadges().subscribe((badges) => this.badges = badges);
  }

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    // reset pagnination stuff
    this.pageNumber = 2;
    this.paginationComplete = false;
    this.selectedFilter = tabChangeEvent.index;
    // index 0 = all, 1 = earned, 2 = unearned
    if (this.selectedFilter) {
      this.badgeService.getBadgesByState(this.selectedFilter === 1).subscribe((badges) => this.badges = badges);
    } else {
      this.badgeService.getAllBadges().subscribe((badges) => this.badges = badges);
    }
  }

  public onScroll(): void {
    // do nothing on scroll if we've arleady fetched all badges
    if (this.paginationComplete) {
      return;
    }

    // do we have a filter applied
    const activeFilter = this.selectedFilter > 0 ? true : false;
    iif(() => activeFilter,
      this.badgeService.getBadgesByState(this.selectedFilter === 1, this.pageNumber),
      this.badgeService.getAllBadges(this.pageNumber)
    ).subscribe((badges) => {
      if (badges.length) {
        // if we have new transactions, add to existing list of transactions
        this.badges = [...this.badges, ...badges];
        this.pageNumber++;
      } else {
        // mark pagination ended if no transactions are retuned
        this.paginationComplete = true;
      }
    });
  }
}
