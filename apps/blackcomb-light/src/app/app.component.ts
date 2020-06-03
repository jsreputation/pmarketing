import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService, ConfigService, IConfig, IPopupConfig, NotificationService, PopupComponent } from '@perxtech/core';
import { filter, map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public preAuth: boolean;
  public translationLoaded: boolean = false;

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
    private snack: MatSnackBar,
    private router: Router,
    private config: ConfigService,
    private translate: TranslateService,
    private activeRoute: ActivatedRoute,
    private authenticationService: AuthenticationService
  ) {
  }

  public ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.token),
        map((params: Params) => params.token),
      )
      .subscribe((token: string) => this.authenticationService.saveUserAccessToken(token));

    this.config.readAppConfig()
      .pipe(switchMap((conf) => this.translate.getTranslation(conf.defaultLang as string)))
      .subscribe((config: IConfig<void>) => {
        this.translationLoaded = true;
        this.preAuth = config.preAuth as boolean;
      });

    this.notificationService.$popup
      .subscribe(
        (data: IPopupConfig) => this.dialog.open(PopupComponent, { data }),
        (err) => console.error(err)
      );

    this.notificationService.$snack
      .subscribe(
        (msg: string) => {
          if (msg === 'LOGIN_SESSION_EXPIRED') {
            this.router.navigate(['/login']);
            msg = 'Login Session Expired';
          }
          this.snack.open(msg, 'x', { duration: 2000 });
        },
        (err) => console.error(err)
      );
  }
}
