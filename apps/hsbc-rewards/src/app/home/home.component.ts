import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { IReward, RewardsService, LoyaltyService, ProfileService } from '@perx/core';
import { LoyaltySummaryComponent } from '@perx/core';

const mockTags = [
  'Lifestyle', 'Travel', 'Shopping'
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  public tags: Array<string>;
  public rewards: Observable<IReward[]>;

  public currentTag: string;

  @ViewChild('loyaltySummary', { static: false }) public loyaltySummary: LoyaltySummaryComponent;

  constructor(
    private rewardsService: RewardsService,
    private loyaltyService: LoyaltyService,
    private profile: ProfileService,
    private cd: ChangeDetectorRef,
  ) {
  }

  public ngOnInit(): void {
    this.getRewards();
    this.getTags();
  }
  public ngAfterViewInit(): void {
    // @ts-ignore to be verified
    this.loyaltySummary.loyalty$ = new BehaviorSubject({
      pointsBalance: '100,000', expiringPoints: [{ expireDate: new Date('Jul 17 2017') }], points: 1000, expireDate: new Date('Jul 17 2017')
    });
    this.cd.detectChanges();
  }
  public getRewards(): void {
    this.rewardsService.getAllRewards().subscribe(
      (rewards: IReward[]) => {
        if (rewards && rewards.length > 0) {
          this.rewards = of(rewards);
        }
      }
    );
  }

  public getTags(): void {
    this.rewardsService.getTags();
    this.tags = mockTags;
    this.currentTag = this.tags[0];
  }

  public changeTage(tag: string): void {
    this.currentTag = tag;
  }
}
