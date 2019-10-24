import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material';
import { PopupComponent, NotificationService, IPopupConfig, ThemesService, ITheme, AuthenticationService } from '@perx/core';
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
import { TranslateService } from '@ngx-translate/core';

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
    private authService: AuthenticationService,
    private translate: TranslateService,
    private cd: ChangeDetectorRef
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
      }
    );

    this.notificationService.$popup
      .subscribe((data: IPopupConfig) => this.dialog.open(PopupComponent, { data }));

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
  public translateRebuild(){
    this.translate.reloadLang('en').subscribe(()=>{
      console.log(this.translate.store);
      this.cd.detectChanges();
    })

  }
  public onActivate(ref: any): void {
    this.showHeader = !(ref instanceof LoginComponent);
    this.showToolbar = ref instanceof HomeComponent ||
      ref instanceof HistoryComponent ||
      ref instanceof AccountComponent ||
      ref instanceof WalletComponent;
  }

  public leftClick(): void {
    if (this.leftIcon !== '') {
      this.location.back();
    }
  }
}
