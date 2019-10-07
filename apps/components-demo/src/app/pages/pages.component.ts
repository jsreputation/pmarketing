import { Component, OnInit, OnDestroy } from '@angular/core';
import { INavLink } from '../navlink.model';
import { SubscriptionLike } from 'rxjs';
import { MatDialog } from '@angular/material';
import { NotificationService, PopupComponent } from '@perx/core';
// tap history home reward loading login redeem reward-detail stamp survey tnc voucher
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss']
})
export class PagesComponent implements OnInit, OnDestroy {
  public navLinks: INavLink[] = [
    { path: 'account', label: 'Account' },
    { path: 'contact-us', label: 'Cotact Us' },
    { path: 'history', label: 'History'},
    { path: 'home', label: 'Home'},
    { path: 'reward', label: 'Reward'},
    { path: 'loading', label: 'Loading'},
    { path: 'login', label: 'Login'},
    { path: 'redeem', label: 'Redeem'},
    { path: 'reward-detail', label: 'Reward-detail'},
    { path: 'stamp', label: 'Stamp'},
    { path: 'survey', label: 'Survey'},
    { path: 'tnc', label: 'Tnc'},
    { path: 'voucher', label: 'Voucher'}
  ];
  private popupSubscription: SubscriptionLike;

  constructor(private dialog: MatDialog,
              private notificationService: NotificationService) {
  }

  public ngOnInit(): void {
    this.popupSubscription = this.notificationService.$popup.subscribe(data => {
      this.dialog.open(PopupComponent, { data });
    });
  }

  public ngOnDestroy(): void {
    this.popupSubscription.unsubscribe();
  }
}
