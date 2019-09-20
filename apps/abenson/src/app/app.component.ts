import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupComponent, NotificationService, IPopupConfig } from '@perx/core';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { AccountComponent } from './account/account.component';
import { PromosComponent } from './promos/promos.component';
import { CardComponent } from './card/card.component';
import { SignUpComponent } from './signup/signup.component';
import { WalletComponent } from './wallet/wallet.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public showHeader: boolean = true;
  public showToolbar: boolean = true;

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.notificationService.$popup
      .subscribe((data: IPopupConfig) => this.dialog.open(PopupComponent, { data }));
  }

  public onActivate(ref: any): void {
    this.showHeader = !(ref instanceof LoginComponent || ref instanceof SignUpComponent );
    this.showToolbar = ref instanceof HomeComponent ||
      ref instanceof HistoryComponent ||
      ref instanceof PromosComponent ||
      ref instanceof AccountComponent ||
      ref instanceof WalletComponent ||
      ref instanceof CardComponent;
  }
}
