import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupComponent, NotificationService, IPopupConfig, ITheme, AuthenticationService } from '@perx/core';
import {
  HomeComponent,
  HistoryComponent,
  AccountComponent,
  LoginComponent,
  WalletComponent
} from '@perx/blackcomb-pages';
import { Location } from '@angular/common';
import { Router, NavigationEnd, Event } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public showHeader: boolean;
  public showToolbar: boolean;
  public leftIcon: string = '';
  public preAuth: boolean;
  public theme: ITheme;

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private location: Location,
    private router: Router,
    private authService: AuthenticationService,
    private cd: ChangeDetectorRef
  ) {
    this.preAuth = environment.preAuth;
  }

  public ngOnInit(): void {
    this.authService.$failedAuth.subscribe(
      res => {
        if (res) {
          this.router.navigate(['/login']);
        }
      }
    );

    this.notificationService.$popup
      .subscribe((data: IPopupConfig) => {
        console.log('test');
        this.dialog.open(PopupComponent, { data });
      },
      (err) => {
        console.log('test1');
        console.log(err);
      });

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
          '/c'
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
      ref instanceof WalletComponent;
    this.cd.detectChanges();
  }

  public leftClick(): void {
    if (this.leftIcon !== '') {
      this.location.back();
    }
  }
}
