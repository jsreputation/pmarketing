import { Component, OnInit } from '@angular/core';
import { MatTabChangeEvent } from '@angular/material/tabs';
import { ActivatedRoute } from '@angular/router';
import { IBadge, BadgeService } from '@perxtech/core';
import { iif, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'badge-landing',
  templateUrl: './badge-landing.component.html',
  styleUrls: ['./badge-landing.component.scss'],
})
export class BadgeLandingComponent implements OnInit {
  public badges: IBadge[];
  public selectedFilter: number = 0;
  private pageNumber: number = 2;
  private paginationComplete: boolean = false;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private badgeService: BadgeService, private activeRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    this.activeRoute.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      if (params?.filter) {
        this.selectedFilter = params.filter === 'earned' ? 1 : 0;
        this.destroy$.next();
      }
      this.fetchBadges();
    });
  }

  public tabChanged(tabChangeEvent: MatTabChangeEvent): void {
    // reset pagnination stuff
    this.pageNumber = 2;
    this.paginationComplete = false;
    this.selectedFilter = tabChangeEvent.index;
    this.fetchBadges();
  }

  private fetchBadges(): void {
    // index 0 = all, 1 = earned, 2 = unearned
    iif(() => this.selectedFilter > 0,
      this.badgeService.getBadgesByState(this.selectedFilter === 1),
      this.badgeService.getAllBadges()
    ).subscribe((badges) => this.badges = badges);
  }

  public onScroll(): void {
    // do nothing on scroll if we've arleady fetched all badges
    if (this.paginationComplete) {
      return;
    }

    // do we have a filter applied
    iif(() => this.selectedFilter > 0,
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
