import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest } from 'rxjs';
import { LoyaltyService } from '../../loyalty/loyalty.service';
import { RewardsService } from '../../rewards/rewards.service';
import { LeaderBoard, LeaderboardOutcome } from '../models/rank.model';

@Component({
  selector: 'perx-core-leaderboard-about',
  templateUrl: './leaderboard-about.component.html',
  styleUrls: ['./leaderboard-about.component.scss']
})
export class LeaderboardAboutComponent implements OnInit {
  @Input() public data: LeaderBoard;

  constructor(
    private translateService: TranslateService,
    private rewardService: RewardsService,
    private loyaltyService: LoyaltyService) { }
  public prizesTxt: string;
  public rankTxt: string;
  public tncTitle: string;
  public loyaltyPoints: string;
  public aboutImageUrl: string;

  public ngOnInit(): void {
    combineLatest([
      this.translateService.get('LEADER_BOARD.PRIZES'),
      this.translateService.get('LEADER_BOARD.RANK'),
      this.translateService.get('LEADER_BOARD.TERMS_AND_CONDITIONS'),
      this.translateService.get('LEADER_BOARD.LOYALTY_POINTS')])
      .subscribe(
        ([prizes, rank, tncTitle, loyaltyPoints]) => {
          this.prizesTxt = prizes;
          this.rankTxt = rank;
          this.tncTitle = tncTitle;
          this.loyaltyPoints = loyaltyPoints;
          this.prepPodiums();
        }
      );
  }

  private getRankName(name: string | null, index: number): string {
    return name ? `${name} ${this.prizesTxt}:` : `${this.rankTxt} ${index + 1} ${this.prizesTxt}:`;
  }

  private prepPodiums(): void {
    if (this.data.podiums.length) {
      this.data.podiums.forEach((podium, index) => {
        // build rank name
        const rankName = podium && podium.displayProperties && podium.displayProperties.rankName ? podium.displayProperties.rankName : null;
        this.data.podiums[index].displayProperties = {
          ...this.data.podiums[index].displayProperties,
          rankName: this.getRankName(rankName, index)
        };

        if (podium.outcomes && podium.outcomes.length) {
          // for each outcome
          podium.outcomes.forEach((outcome, outcomeIndex) => {
            if (outcome.pointsCount) {
              // fetch loyalty detail to extract program name
              this.loyaltyService.getLoyalty(outcome.modularizableId).subscribe((loyaltyProgram) => {
                podium.outcomes[outcomeIndex] = {
                  ...podium.outcomes[outcomeIndex],
                  name: `${outcome.pointsCount} ${this.loyaltyPoints} - ${loyaltyProgram.name}`
                };
              });
            } else {
              //  get reward name
              this.rewardService.getReward(outcome.modularizableId).subscribe((reward) => {
                podium.outcomes[outcomeIndex] = reward as LeaderboardOutcome;
              });
            }
            this.data.podiums[index] = podium;
          });
        }
      });
    }
  }
}
