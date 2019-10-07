import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupComponent, NotificationService, IPopupConfig, ThemesService, ITheme, AuthenticationService } from '@perx/core';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { HistoryComponent } from './history/history.component';
import { AccountComponent } from './account/account.component';
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
  public showHeader: boolean = true;
  public showToolbar: boolean = true;
  public leftIcon: string = '';
  public preAuth: boolean;
  public theme: ITheme;

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private location: Location,
    private router: Router,
    private themesService: ThemesService,
    private authService: AuthenticationService
  ) {
    this.preAuth = environment.preAuth;
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
      },
      () => console.log('success here')
    );

    this.notificationService.$popup
      .subscribe((data: IPopupConfig) => this.dialog.open(PopupComponent, { data }));

    console.log(this.notificationService.$popup);
    console.log(this.authService.$failedAuth);
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
      ref instanceof AccountComponent;
  }

  public leftClick(): void {
    if (this.leftIcon !== '') {
      this.location.back();
    }
  }
}
