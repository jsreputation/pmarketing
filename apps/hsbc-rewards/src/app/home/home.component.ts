import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { IReward, RewardsService, LoyaltyService, ProfileService } from '@perx/core';
import { } from '@perx/core'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {
  rewards: Observable<IReward[]>;
  @ViewChild('loyaltySummary', {static: false}) loyaltySummary;
  constructor(
    private rewardsService: RewardsService,
    private loyaltyService: LoyaltyService,
    private profile: ProfileService,
    private cd: ChangeDetectorRef
  ) { 
  }

  ngOnInit() {
    this.getRewards();
  }
  ngAfterViewInit(): void {
    this.loyaltySummary.loyalty$ = new BehaviorSubject(['a']);
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
}
