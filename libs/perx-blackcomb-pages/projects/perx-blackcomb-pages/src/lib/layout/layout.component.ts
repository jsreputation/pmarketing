import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ThemesService, ITheme, AuthenticationService, Config } from '@perx/core';
// import {
//   HomeComponent,
//   HistoryComponent,
//   AccountComponent,
//   LoginComponent,
//   WalletComponent
// } from '@perx/blackcomb-pages';
import { Location } from '@angular/common';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { LoginComponent } from '../login/login.component';
import { HomeComponent } from '../home/home.component';
import { HistoryComponent } from '../history/history.component';
import { AccountComponent } from '../account/account.component';
import { WalletComponent } from '../wallet/wallet.component';
import { WalletHistoryComponent } from '../wallet-history/wallet-history.component';

@Component({
  selector: 'perx-blackcomb-games-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  public showHeader: boolean;
  public showToolbar: boolean;
  public leftIcon: string = '';
  public preAuth: boolean;
  public theme: ITheme;

  constructor(
    private location: Location,
    private router: Router,
    private themesService: ThemesService,
    private authService: AuthenticationService,
    private cd: ChangeDetectorRef,
    private config: Config
  ) {
    if (config) {
      this.preAuth = this.config.preAuth || false;
    }
  }

  public ngOnInit(): void {
    this.themesService.getThemeSetting().subscribe(
      theme => this.theme = theme
    );

    this.authService.$failedAuth.subscribe(
      res => {
        if (res) {
          this.router.navigate(['/login']);
        }
      }
    );

    // this.notificationService.$popup
    //   .subscribe((data: IPopupConfig) => this.dialog.open(PopupComponent, { data }));

    this.router.events
      .pipe(
        filter((event: Event) => event instanceof NavigationEnd),
        map((event: NavigationEnd) => event.urlAfterRedirects)
      )
      .subscribe((url: string) => {
        const urlsWithBack: string[] = [
          '/voucher-detail',
          '/redeem',
          '/tnc',
          '/contact-us',
          '/reward-detail',
          '/c',
          '/qr'
        ];
        // if current url starts with any of the above segments, use arrow_backward
        this.leftIcon = urlsWithBack.some(test => url.startsWith(test)) ? 'arrow_backward' : '';
      });

  }

  public onActivate(ref: any): void {
    this.showHeader = !(ref instanceof LoginComponent);
    this.showToolbar = ref instanceof HomeComponent ||
      ref instanceof HistoryComponent ||
      ref instanceof AccountComponent ||
      ref instanceof WalletComponent ||
      ref instanceof WalletHistoryComponent;
    this.cd.detectChanges();
  }

  public leftClick(): void {
    if (this.leftIcon !== '') {
      this.location.back();
    }
  }
}
