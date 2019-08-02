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
  navigatePanel = [{
    activated: false,
    title: 'Home',
    img: 'assets/img/home.svg',
  }, {
    activated: false,
    title: 'My Rewards',
    img: 'assets/img/rewards.svg'
  }, {
    activated: false,
    title: 'Account',
    img: 'assets/img/account.svg'
  }]
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
    this.loyaltySummary.loyalty$ = new BehaviorSubject({
      pointsBalance: '100,000', expiringPoints: [ {expireDate :new Date('Jul 17 2017')}], points: 1000, expireDate: new Date('Jul 17 2017')
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
}
