import { Component, Input } from '@angular/core';
import { CreateEngagementPopupComponent } from '../../../shared/containers/create-engagement-popup/create-engagement-popup.component';
import { MatDialog } from '@angular/material';
import { Router } from '@angular/router';
export enum DashboardGameCardName {
  engagement = 'engagement',
  campaign = 'campaign',
  reward = 'reward'
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
    const listActions = {
      [DashboardGameCardName.engagement]: this.openDialogCreate.bind(this),
      [DashboardGameCardName.campaign]: this.goToCampaign.bind(this),
      [DashboardGameCardName.reward]: this.goToRewardNew.bind(this),
    };
    // tslint:disable
    (typeof listActions[name] === 'function') && listActions[name]();
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
