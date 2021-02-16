import {
  LangChangeEvent,
  TranslateService
} from '@ngx-translate/core';
import {
  Component,
  OnInit
} from '@angular/core';
import {
  ConfigService,
  IConfig,
  NotificationService,
  TokenStorage
} from '@perxtech/core';
import { MatSnackBar } from '@angular/material';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'merck-merchant';

  constructor(
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    private router: Router,
    private translateService: TranslateService,
    private configService: ConfigService,
    private store: TokenStorage
  ) {
    this.notificationService.$snack.subscribe((message: string) => {
      if (message === 'LOGIN_SESSION_EXPIRED') {
        this.router.navigate(['/login']);
        this.translateService.get('LOGIN_SESSION_EXPIRED').subscribe(
          txt => this.snackBar.openFromComponent(CustomSnackbarComponent, {
            data: {
              txt,
              icon: 'clear',
            },
            duration: 4000,
          })
        );
      }
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: {
          message,
          icon: 'clear',
        },
        duration: 4000,
      });
    });
  }

  public ngOnInit(): void {
    const lang = this.store.getAppInfoProperty('merck-merchant') || this.translateService.currentLang || this.translateService.defaultLang;
    this.translateService.use(lang);
    this.translateService.onLangChange.subscribe((change: LangChangeEvent) => {
      this.store.setAppInfoProperty(change.lang, 'merck-merchant');
    });
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        if (config.appVersion) {
          (window as any).PERX_APP_VERSION = config.appVersion;
        }
      }
    );
  }

}
