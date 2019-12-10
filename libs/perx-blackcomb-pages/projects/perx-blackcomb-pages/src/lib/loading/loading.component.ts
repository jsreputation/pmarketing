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
} from 'rxjs';

import {
  AuthenticationService,
  Config,
  NotificationService,
  ICampaign,
  ICampaignService
} from '@perx/core';

import * as uuid from 'uuid';

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

  private destroy$: Subject<any> = new Subject();

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

  private goWallet(): void {
    this.router.navigate(['/wallet']);
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
          () => this.goWallet()
        );
    } else {
      this.goWallet();
    }
  }

  private initCampaignEndedPopup(): void {
    this.notificationService.addPopup({
      title: `Oops, the Campaign has ended`,
      text: `We'll be in touch soon.`,
      imageUrl: `assets/beer_and_tea.png`,
      buttonTxt: 'Back To Wallet',
    });
  }

  private redirectAfterLogin(): void {
    if (this.campaignData && !this.isCampaignEnded) {
      this.redirectToEngagementPage(this.campaignData.type);
    } else if (this.campaignId && this.isCampaignEnded) {
      this.initCampaignEndedPopup();
    } else {
      this.goWallet();
    }
  }

  private redirectToEngagementPage(type: string): void {
    this.router.navigateByUrl(
      this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : `${type}/${this.campaignId}`
    );
  }

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthenticationService,
    private campaignSvc: ICampaignService,
    private config: Config,
    private notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.preAuth = this.config && this.config.preAuth ? this.config.preAuth : false;
  }

  public ngOnInit(): void {
    if (this.preAuth && isPlatformBrowser(this.platformId)) {
      const params = this.route.snapshot.queryParams;
      (window as any).primaryIdentifier = params.pi;
      const cid: string | null = params.cid;
      this.campaignId = cid ? Number.parseInt(cid, 10) : (window as any).campaignId;
      (window as any).campaignId = this.campaignId;
      /*
      * Later when API ready, the logic is:
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
          queryParams => iif(() => !!queryParams.pi, PIHandler$, noPIHandler$)
        ),
        takeUntil(this.destroy$)
      ).subscribe(
        () => this.getCampaignData(),
        () => this.router.navigate(['/login'])
      );
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
