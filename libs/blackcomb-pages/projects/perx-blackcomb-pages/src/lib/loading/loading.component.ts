import {
  Component,
  OnInit,
  Inject,
  PLATFORM_ID,
  OnDestroy,
} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

import {
  switchMap,
  tap,
  takeUntil,
} from 'rxjs/operators';
import {
  of,
  iif,
  Subject,
  throwError,
  EMPTY
} from 'rxjs';

import {
  AuthenticationService,
  Config,
  NotificationService,
  ICampaign,
  ICampaignService,
  IConfig,
  ConfigService,
  FlagLocalStorageService,
  TokenStorage
} from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';

import * as uuid from 'uuid';

interface ILoginConfig {
  redirectAfterLogin: string;
}

// @dynamic
@Component({
  selector: 'perx-blackcomb-pages-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit, OnDestroy {
  public preAuth: boolean;

  private campaignId: number | null = null;
  private campaignData: ICampaign | null = null;

  private destroy$: Subject<void> = new Subject();
  private appConfig: IConfig<ILoginConfig>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private campaignSvc: ICampaignService,
    private config: Config,
    private configService: ConfigService,
    private notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: object,
    private flagLocalStorageService: FlagLocalStorageService,
    private tokenStorage: TokenStorage,
    private translate: TranslateService
  ) {
    this.preAuth = this.config && this.config.preAuth ? this.config.preAuth : false;
  }

  public ngOnInit(): void {
    this.configService.readAppConfig<ILoginConfig>().subscribe((conf: IConfig<ILoginConfig>) => this.appConfig = conf);
    const params = this.route.snapshot.queryParams;
    (window as any).primaryIdentifier = params.pi;
    const cid: string | null = params.cid;
    this.campaignId = cid ? Number.parseInt(cid, 10) : (window as any).campaignId;
    (window as any).campaignId = this.campaignId;
    const paramArr: string[] = params.flags && params.flags.split(',');
    const chromelessFlag: boolean = paramArr && paramArr.includes('chromeless');
    const preAuthFlag: boolean = paramArr && paramArr.includes('preAuth');
    const langCode: string | null = params.lang;
    if (langCode) {
      this.tokenStorage.setAppInfoProperty(langCode, 'lang');
      this.translate.use(langCode);
    }


    if (chromelessFlag) {
      this.flagLocalStorageService.setFlagInLocalStorage('chromeless', 'true');
    } else if ('flags' in params) {
      this.flagLocalStorageService.resetFlagInLocalStorage('chromeless');
    }

    if (preAuthFlag) {
      this.flagLocalStorageService.setFlagInLocalStorage('preAuth', 'true');
    } else if ('flags' in params) {
      this.flagLocalStorageService.resetFlagInLocalStorage('preAuth');
    }

    const preAuthMode = Boolean(this.flagLocalStorageService.getFlagInLocalStorage('preAuth'));
    if ((this.preAuth || preAuthMode) && isPlatformBrowser(this.platformId)) {
      /*
      * The logic is:
      * 1. check PI, then will call autoLogin
      * 2. check hasToken,then go to next page based on campaign id. Then need to finish refreshToken function to handle 401 from API return
      * 3. If no PI and no token found, then call autoLoginWithoutPI to create new account and auto login
      * */
      const PIHandler$ = this.authService.autoLogin();
      const createUserAndAutoLogin$ = pi => this.authService.createUserAndAutoLogin(pi, undefined, true);
      const autoLoginWithoutPI$ = of(uuid.v4()).pipe(
        switchMap(newPI => createUserAndAutoLogin$(newPI)),
        takeUntil(this.destroy$)
      );
      const getLocalToken$ = this.authService.getAccessToken();
      const noPIHandler$ = getLocalToken$.pipe(
        switchMap(
          localToken => iif(() => !!localToken, of(localToken), autoLoginWithoutPI$)
        ),
        takeUntil(this.destroy$)
      );
      const getPI$ = this.route.queryParams;

      getPI$.pipe(
        switchMap(
          queryParams => {
            if (queryParams.token) {
              this.authService.saveUserAccessToken(queryParams.token);
            }
            if (!this.authService.getUserAccessToken() && !queryParams.pi) {
              this.router.navigate(['error']);
              return EMPTY;
            }
            return iif(() => !!queryParams.pi, PIHandler$, noPIHandler$);
          }
        ),
        takeUntil(this.destroy$)
      ).subscribe(
        () => this.getCampaignData(),
        (err) => {
          if (err.status === 401) {
            this.router.navigate(['error']);
          } else {
            this.router.navigate([this.appConfig.homeAsProgressPage ? '/loading' : 'login']);
          }
        }
      );
    } else {
      this.authService.getAccessToken().pipe(
        switchMap(localToken => iif(() => !!localToken, of(localToken), throwError('no token'))),
        takeUntil(this.destroy$)
      )
        .subscribe(
          () => this.getCampaignData(),
          () => this.router.navigate([this.appConfig.homeAsProgressPage ? '/loading' : 'login'])
        );
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get isCampaignEnded(): boolean {
    if (!this.campaignData) {
      return true;
    }
    if (!this.campaignData.endsAt) {
      return false;
    }
    const now: number = (new Date()).getTime();
    const endDate = (new Date(this.campaignData.endsAt)).getTime();
    return endDate < now;
  }

  private goToRouteFromConfig(): void {
    this.router.navigate([(this.appConfig.custom && this.appConfig.custom.redirectAfterLogin) || 'wallet']);
  }

  private getCampaignData(): void {
    if (this.campaignId) {
      this.campaignSvc.getCampaign(this.campaignId)
        .pipe(
          tap((campaignData: ICampaign) => { this.campaignData = campaignData; }),
          takeUntil(this.destroy$)
        )
        .subscribe(
          () => this.redirectAfterLogin(),
          () => this.goToRouteFromConfig()
        );
    } else {
      this.goToRouteFromConfig();
    }
  }

  private initCampaignEndedPopup(): void {
    this.notificationService.addPopup({
      title: 'Oops, the Campaign has ended',
      text: 'We\'ll be in touch soon.',
      imageUrl: 'assets/beer_and_tea.png',
      buttonTxt: 'Back To Wallet',
    });
  }

  private redirectAfterLogin(): void {
    if (this.campaignData && !this.isCampaignEnded) {
      let path = this.campaignData.type.toString();
      if (this.campaignData.subType === 'quiz') {
        path = 'quiz';
      }
      if (this.campaignData.subType === 'survey') {
        path = 'survey';
      }
      this.redirectToEngagementPage(path);
    } else if (this.campaignId && this.isCampaignEnded) {
      this.initCampaignEndedPopup();
    } else {
      this.goToRouteFromConfig();
    }
  }

  private redirectToEngagementPage(type: string): void {
    if (type === 'quiz' || type === 'survey') {
      this.router.navigateByUrl(
        this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : `campaign-welcome/${this.campaignId}`
      );
    } else {
      this.router.navigateByUrl(
        this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : `${type}/${this.campaignId}` // placehold might be
        // updated
      );
    }

  }
}
