import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { LeaderBoard } from '../models/rank.model';

@Component({
  selector: 'perx-core-leaderboard-list',
  templateUrl: './leaderboard-list.component.html',
  styleUrls: ['./leaderboard-list.component.scss']
})
export class LeaderboardListComponent {

  @Input() public leaderboards: LeaderBoard[];
  public ghostTimeOut: boolean;

  constructor(private router: Router) { }

  public onClick(leaderboard: LeaderBoard): void {
    this.router.navigate([`leaderboard/${leaderboard.id}`]);
  }

  public getHeaderImage(leaderboard: LeaderBoard): string {
    const images = leaderboard.images;
    if (images && images.length) {
      const banner = images.find((image) => image.section === 'banner_1' || image.section === 'banner_2');
      return banner ? banner.url : '';
    }
    return '';
  }
}
