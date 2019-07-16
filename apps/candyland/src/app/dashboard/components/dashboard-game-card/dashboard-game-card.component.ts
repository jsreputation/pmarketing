import { Component, Input, OnInit } from '@angular/core';
import { CreateEngagementPopupComponent } from '../../../shared/containers/create-engagement-popup/create-engagement-popup.component';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'cl-dashboard-game-card',
  templateUrl: './dashboard-game-card.component.html',
  styleUrls: ['./dashboard-game-card.component.scss']
})
export class DashboardGameCardComponent implements OnInit {
  @Input() gameCard: DashboardGameCard;
  constructor(public dialog: MatDialog) { }

  ngOnInit() {
  }

  public clickToLink(link: string): void {
    if (link.toLocaleLowerCase().includes('engagement')) {
      this.openDialogCreate();
    }
  }

  public openDialogCreate(): void {
    this.dialog.open(CreateEngagementPopupComponent);

  }

}
