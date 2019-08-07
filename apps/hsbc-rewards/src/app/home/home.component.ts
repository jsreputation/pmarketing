import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { IReward, RewardsService, LoyaltyService } from '@perx/core';
import { Router } from '@angular/router';

const mockTags = [
  'Lifestyle', 'Travel', 'Shopping'
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  tags: Array<string>;
  rewards: Observable<IReward[]>;
  currentTag: string;
  @ViewChild('loyaltySummary', { static: false }) loyaltySummary;

  constructor(
    private rewardsService: RewardsService,
    private loyaltyService: LoyaltyService,
    private cd: ChangeDetectorRef,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.getRewards();
    this.getTags();
  }
  ngAfterViewInit(): void {
    this.loyaltySummary.loyalty$ = new BehaviorSubject({
      pointsBalance: '100,000', expiringPoints: [{ expireDate: new Date('Jul 17 2017') }], points: 1000, expireDate: new Date('Jul 17 2017')
    });
    this.cd.detectChanges();
  }
  getRewards() {
    this.rewardsService.getAllRewards().subscribe(
      (rewards: IReward[]) => {
        if (rewards && rewards.length > 0) {
          this.rewards = of(rewards);
        }
      }
    );
  }

  getTags() {
    this.rewardsService.getTags();
    this.tags = mockTags;
    this.currentTag = this.tags[0];
  }

  changeTage(tag) {
    this.currentTag = tag;
  }

  async openRewardDetails(event) {
    const url = 'detail/element/' + (event instanceof Observable ?
      (await event.toPromise())[0].id : event.id)
    this.router.navigate([url]);
  }
}
