import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Location } from '@angular/common';
import { PopupComponent, NotificationService, IPopupConfig } from '@perx/core';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { AccountComponent } from './account/account.component';
import { PromosComponent } from './promos/promos.component';
import { CardComponent } from './card/containers/card/card.component';
import { SignUpComponent } from './signup/signup.component';
import { WalletComponent } from './wallet/wallet.component';
import { ProfileComponent } from './account/profile/profile.component';
import { ChangeBarangayComponent } from './account/profile/change-barangay/change-barangay.component';
import { ChangePasswordComponent } from './account/change-password/change-password.component';
import { ChangeEmailComponent } from './account/profile/change-email/change-email.component';
import { ChangeCityComponent } from './account/profile/change-city/change-city.component';
import { ChangeStreetAddressComponent } from './account/profile/change-street-address/change-street-address.component';
import { FaqComponent } from './account/profile-additions/containers/faq/faq.component';
import { PrivacyPolicyComponent } from './account/profile-additions/containers/privacy-policy/privacy-policy.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public showHeader: boolean = true;
  public showToolbar: boolean = true;
  public showBackArrow: boolean = false;
  public showLogo: boolean = false;
  public showPageTitle: boolean = false;
  public headerTitle: string = '';

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private location: Location,
    private snackBar: MatSnackBar,
  ) { }

  public ngOnInit(): void {
    this.notificationService.$popup
      .subscribe((data: IPopupConfig) => this.dialog.open(PopupComponent, { data }));
    this.notificationService.$snack
      .subscribe((msg: string) => this.snackBar.open(msg, 'x', { duration: 2000 }));
  }

  public onActivate(ref: any): void {
    this.showHeader = !(ref instanceof LoginComponent || ref instanceof SignUpComponent );
    this.showToolbar = ref instanceof HomeComponent ||
      ref instanceof HistoryComponent ||
      ref instanceof PromosComponent ||
      ref instanceof AccountComponent ||
      ref instanceof WalletComponent ||
      ref instanceof CardComponent;
    this.showBackArrow = !this.showHeader || !this.showToolbar;
    this.showLogo = !(ref instanceof ProfileComponent ||
      ref instanceof ChangeBarangayComponent ||
      ref instanceof ChangePasswordComponent ||
      ref instanceof ChangeEmailComponent ||
      ref instanceof ChangeCityComponent ||
      ref instanceof ChangeStreetAddressComponent ||
      ref instanceof FaqComponent ||
      ref instanceof PrivacyPolicyComponent);
    this.showPageTitle = !this.showLogo;
    this.headerTitle = ref instanceof ProfileComponent ? 'Profile' :
      ref instanceof ChangeBarangayComponent ? 'Change Barangay' :
        ref instanceof ChangePasswordComponent ? 'Change PIN Code' :
          ref instanceof ChangeEmailComponent ? 'Change Email' :
            ref instanceof ChangeCityComponent ? 'Change City/Municipality' :
              ref instanceof ChangeStreetAddressComponent ? 'Change Street Address' :
                ref instanceof FaqComponent ? 'FAQ' :
                  ref instanceof PrivacyPolicyComponent ? 'Privacy Policy' : '' ;
  }

  public goBack(): void {
    this.location.back();
  }
}
