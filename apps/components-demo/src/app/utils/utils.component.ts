import { Component, OnDestroy, OnInit } from '@angular/core';
import { INavLink } from '../navlink.model';
import { NotificationService, PopupComponent } from '@perxtech/core';
import { MatDialog } from '@angular/material';
import { SubscriptionLike } from 'rxjs';

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss']
})
export class UtilsComponent implements OnInit, OnDestroy {
  public navLinks: INavLink[] = [
    { path: 'pin-input', label: 'Pin Input' },
    { path: 'popup', label: 'Popup' }
  ];
  private popupSubscription: SubscriptionLike;

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.popupSubscription = this.notificationService.$popup.subscribe(data => {
      this.dialog.open(PopupComponent, { data });
    });
  }

  public ngOnDestroy(): void {
    this.popupSubscription.unsubscribe();
  }
}
