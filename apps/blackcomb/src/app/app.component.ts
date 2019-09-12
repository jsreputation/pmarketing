import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupComponent, NotificationService, IPopupConfig } from '@perx/core';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { AccountComponent } from './account/account.component';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public showHeader: boolean = true;
  public showToolbar: boolean = true;
  public preAuth: boolean;

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.preAuth = environment.preAuth;
  }

  public ngOnInit(): void {
    if (this.preAuth && isPlatformBrowser(this.platformId) && !((window as any).primaryIdentifier)) {
      const param = location.search;
      (window as any).primaryIdentifier = new URLSearchParams(param).get('pi');
      (window as any).campaignId = new URLSearchParams(param).get('cid');
    }

    this.notificationService.$popup
      .subscribe((data: IPopupConfig) => this.dialog.open(PopupComponent, { data }));
  }

  public onActivate(ref: any): void {
    this.showHeader = !(ref instanceof LoginComponent);
    this.showToolbar = ref instanceof HomeComponent ||
      ref instanceof HistoryComponent ||
      ref instanceof AccountComponent;
  }
}
