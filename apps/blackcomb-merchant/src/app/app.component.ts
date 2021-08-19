import { Component, OnInit } from '@angular/core';
import { ConfigService, IConfig, ThemesService, ITheme, NotificationService } from '@perxtech/core';
import {
  switchMap,
  tap,
} from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  public theme: ITheme;
  public backgroundUrl: string;
  public subtitle: string;

  constructor(
    private configService: ConfigService,
    private themesService: ThemesService,
    private notificationService: NotificationService,
    private snack: MatSnackBar,
  ) {
  }

  public ngOnInit(): void {

    this.configService.readAppConfig().pipe(
      tap((config: IConfig<void>) => {
        if (config.appVersion) {
          (window as any).PERX_APP_VERSION = config.appVersion;
        }
      }),
      switchMap(() => this.themesService.getThemeSetting())).subscribe(
        (theme) => {
          this.theme = theme;
          this.backgroundUrl = this.theme.properties['--background_image'] ? this.theme.properties['--background_image'] : 'assets/background_image.png';
          this.subtitle = this.theme.properties['--subtitle'] ? this.theme.properties['--subtitle'] : 'In-Store Loyalty Program';
        });

    this.notificationService.$snack.subscribe(
      (msg: string) => {
          this.snack.open(msg, 'x', { duration: 2000 });
      },
      (err) => console.error(err)
    );

  }
}
