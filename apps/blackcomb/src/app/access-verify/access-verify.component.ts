import { Component, OnInit } from '@angular/core';
import { AuthenticationService, ConfigService, IConfig, TokenStorage } from '@perxtech/core';
import { ActivatedRoute, Router } from '@angular/router';
import { combineLatest, interval, Observable, of, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Location } from '@angular/common';

export interface IAfterRedirectConfig {
  redirectAfterLogin: string;
}


@Component({
  selector: 'app-access-verify',
  templateUrl: './access-verify.component.html',
  styleUrls: ['./access-verify.component.scss']
})
export class AccessVerifyComponent implements OnInit {
  private destroy$: Subject<void> = new Subject<void>();
  public refreshTokenFlow: boolean;
  public appConfig: IConfig<IAfterRedirectConfig>;
  public appConfig$: Observable<IConfig<IAfterRedirectConfig>>;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorage,
    private location: Location,
    private configService: ConfigService
  ) {
    const navigation = this.router.getCurrentNavigation();
    if (navigation) {
      const state = navigation.extras.state as { refreshTokenFlow: boolean };
      this.refreshTokenFlow = state?.refreshTokenFlow;
    }
  }

  public ngOnInit(): void {
    combineLatest([
      this.route.fragment,
      this.route.queryParams,
      this.configService.readAppConfig<IAfterRedirectConfig>()
    ]).pipe(
    ).subscribe(([fragment, params, config]) => {
      this.appConfig = config;
      const appToken = params?.token;
      const accessToken = this.authService.getUserAccessToken();

      if (appToken) {
        this.authService.saveUserAccessToken(appToken);
      }

      if (fragment) {
        this.authService.saveUserAccessToken(
          new URLSearchParams(fragment).get('token')
        );
      }

      interval(500).pipe(
        switchMap(() => of(sessionStorage.getItem('jwt_token'))),
        takeUntil(this.destroy$)
      ).subscribe(
        (token) => {
          if (token) {
            this.destroy$.next();
            sessionStorage.removeItem('jwt_token');
            this.authService.getExchangeToken(token).subscribe(() => {
              this.tokenStorage.clearAppInfoProperty(['appAccessToken']);
              if (this.refreshTokenFlow) {
                this.location.back();
              } else {
                this.redirectAfterLogin();
              }
            },
              () => this.router.navigate(['/error']));
          } else if (appToken) {
            this.redirectAfterLogin();
          } else if (accessToken) {
            this.redirectAfterLogin();
          }
        }
      );
    });
  }

  private redirectAfterLogin(): void {
    if (this.appConfig.custom && this.appConfig.custom.redirectAfterLogin !== '/login') {
      this.router.navigateByUrl(`${this.appConfig.custom.redirectAfterLogin}`);
    } else {
      this.router.navigate(['/home']);
    }
  }

}
