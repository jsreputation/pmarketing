import { Component, OnInit, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
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
  ICampaignService,
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

  private campaignId: number = null;
  private campaignData: ICampaign = null;

  private destroy$: Subject<any> = new Subject();

  private setCampaignData(): void {
    if (this.campaignId) {
      this.campaignSvc.getCampaign(this.campaignId)
        .pipe(
          takeUntil(this.destroy$)
        )
        .subscribe((campaignData: ICampaign) => {
          this.campaignData = campaignData;
        });
    }
  }

  private setCampaignId(): void {
    this.campaignId = (window as any).campaignId;
  }

  private checkIsCampaignEnded(): void {
    if (this.campaignData && this.campaignData.endsAt) {
      this.router.navigate(['/wallet']);
      this.initCampaignEndedPopup();
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

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private campaignSvc: ICampaignService,
    private config: Config,
    private notificationService: NotificationService,
    @Inject(PLATFORM_ID) private platformId: object,
  ) {
    this.preAuth = this.config ? this.config.preAuth : false;
  }
  public ngOnInit(): void {
    this.setCampaignId();
    this.setCampaignData();
    this.checkIsCampaignEnded();

    if (this.preAuth && isPlatformBrowser(this.platformId)) {
      const param = location.search;
      (window as any).primaryIdentifier = new URLSearchParams(param).get('pi');
      (window as any).campaignId = new URLSearchParams(param).get('cid');
      /*
      * Later when API ready, the logic is:
      * 1. check PI, then will call autoLogin
      * 2. check hasToken,then go to next page based on campaign id. Then need to finish refreshToken function to handle 401 from API return
      * 3. If no PI and no token found, then call autoLoginWithoutPI to create new account and auto login
      * */

      const getUserToken$ = this.authService.autoLogin();
      const PIHandler$ = pi => getUserToken$.pipe(tap(() => this.authService.savePI(pi)));
      const createUserAndAutoLogin$ = pi => this.authService.createUserAndAutoLogin(pi);
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
      const getPI$ = of(new URLSearchParams(param).get('pi'));

      getPI$.pipe(
        switchMap(
          pi => iif(() => !!pi, PIHandler$(pi), noPIHandler$)
        ),
        takeUntil(this.destroy$)
      ).subscribe(
        () => this.redirectAfterLogin(),
        () => this.router.navigate(['/login'])
      );
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public redirectAfterLogin(): void {
    if (this.campaignData && !this.campaignData.endsAt) {
      const { type } = this.campaignData;
      this.router.navigateByUrl(
        this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : `${type}/${this.campaignId}`
      );
    } else {
      this.router.navigate(['/wallet']);
    }
  }
}
