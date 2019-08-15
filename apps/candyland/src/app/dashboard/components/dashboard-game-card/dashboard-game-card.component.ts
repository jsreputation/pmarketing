import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
import { CreateEngagementPopupComponent } from '@cl-shared';
export enum DashboardGameCardName {
  ENGAGEMENT = 'engagement',
  CAMPAIGN = 'campaign',
  REWARD = 'reward'
}
@Component({
  selector: 'cl-dashboard-game-card',
  templateUrl: './dashboard-game-card.component.html',
  styleUrls: ['./dashboard-game-card.component.scss']
})
export class DashboardGameCardComponent {
  @Input() public gameCard: DashboardGameCard;
  constructor(public dialog: MatDialog,
              private router: Router) { }

  public clickToLink(name: string): void {
    switch (name) {
      case `${DashboardGameCardName.ENGAGEMENT}`:
        return this.openDialogCreate();
      case `${DashboardGameCardName.CAMPAIGN}`:
        return this.goToCampaign();
      case `${DashboardGameCardName.REWARD}`:
        return this.goToRewardNew();
      default:
        return console.error(`unknown name: ${name}`);
    }
  }

  private goToRewardNew(): void {
    this.router.navigate(['/rewards/new-reward']);
  }

  private goToCampaign(): void {
    this.router.navigate(['/campaigns/new-campaign/']);
  }

  public openDialogCreate(): void {
    this.dialog.open(CreateEngagementPopupComponent);
  }
}
