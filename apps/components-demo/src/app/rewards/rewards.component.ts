import { Component, OnDestroy, OnInit } from '@angular/core';
import { INavLink } from '../navlink.model';
import { NotificationService, PopupComponent } from '@perx/core';
import { SubscriptionLike } from 'rxjs';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit, OnDestroy {
  public navLinks: INavLink[] = [
    { path: 'collection', label: 'Collection' },
    { path: 'list', label: 'List' },
    { path: 'list-tabbed', label: 'List-Tabbed' },
    { path: 'detail', label: 'Detail' },
  ];
  private popupSubscription: SubscriptionLike;

  constructor(private dialog: MatDialog, private notificationService: NotificationService) { }

  public ngOnInit(): void {
    this.popupSubscription = this.notificationService.$popup.subscribe(data => {
      this.dialog.open(PopupComponent, { data });
    });
  }

  public ngOnDestroy(): void {
    this.popupSubscription.unsubscribe();
  }
}
