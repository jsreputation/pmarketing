import { Component, OnInit, Inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, ICampaignService, Config } from '@perx/core';
import { isPlatformBrowser } from '@angular/common';
import { switchMap, tap } from 'rxjs/operators';
import { of, iif } from 'rxjs';
import * as uuid from 'uuid';

// @dynamic
@Component({
  selector: 'perx-blackcomb-pages-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  public preAuth: boolean;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: object,
    private campaignSvc: ICampaignService,
    private config: Config
  ) {
    this.preAuth = this.config ? this.config.preAuth : false;
  }
  public ngOnInit(): void {
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
        switchMap(newPI => createUserAndAutoLogin$(newPI))
      );
      const getLocalToken$ = this.authService.getAccessToken();
      const noPIHandler$ = getLocalToken$.pipe(
        switchMap(
          localToken => iif(() => !!localToken, of(localToken), autoLoginWithoutPI$)
        )
      );
      const getPI$ = of(new URLSearchParams(param).get('pi'));

      getPI$.pipe(
        switchMap(
          pi => iif(() => !!pi, PIHandler$(pi), noPIHandler$)
        )
      ).subscribe(
        () => this.redirectAfterLogin(),
        () => this.router.navigate(['/login'])
      );
    }
  }
  public redirectAfterLogin(): void {
    const campaignId = (window as any).campaignId;
    // get from game service check what engagement type to route accordingly
    // engagement router - i should put it in its own service
    if (campaignId) {
      this.campaignSvc.getCampaign(campaignId)
        .subscribe(({ type }) => {
          this.router.navigateByUrl(
            this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : `${type}/${campaignId}`
          );
        });
    } else {
      this.router.navigate(['/wallet']);
    }
  }
}
