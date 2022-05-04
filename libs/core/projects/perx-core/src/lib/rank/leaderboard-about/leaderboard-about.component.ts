import { Component, Input, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { combineLatest } from 'rxjs';
import { LeaderBoard } from '../models/rank.model';

@Component({
  selector: 'perx-core-leaderboard-about',
  templateUrl: './leaderboard-about.component.html',
  styleUrls: ['./leaderboard-about.component.scss']
})
export class LeaderboardAboutComponent implements OnInit {
  @Input() public data: LeaderBoard;

  constructor(
    private translateService: TranslateService) { }
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
    return name ? `${name}` : `${this.rankTxt} ${index + 1}`;
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
              podium.outcomes[outcomeIndex] = {
                ...podium.outcomes[outcomeIndex],
                id: outcome?.modularizableId,
                name: `${outcome.pointsCount} ${this.loyaltyPoints} - ${outcome?.outcome?.name}`
              };
            } else {
              podium.outcomes[outcomeIndex] = {
                ...podium.outcomes[outcomeIndex],
                id: outcome?.modularizableId,
                name: `${outcome?.outcome?.name}`
              };
            }
            this.data.podiums[index] = podium;
          });
        }
      });
    }
  }
}
