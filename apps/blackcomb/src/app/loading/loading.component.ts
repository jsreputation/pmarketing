import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService,  ICampaignService } from '@perx/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-loading',
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
  ) {
    this.preAuth = environment.preAuth;
  }
  public ngOnInit(): void {
    if (this.preAuth && isPlatformBrowser(this.platformId) && (window as any).primaryIdentifier) {
      this.authService.autoLogin()
        .subscribe(
          () => this.redirectAfterLogin(),
          () => this.router.navigate(['/login'])
        );
    } else {
      this.router.navigate(['/login']);
    }
  }

  public redirectAfterLogin(): void {
    const campaignId = (window as any).campaignId;
    // get from game service check what engagement type to route accordingly
    // engagement router - i should put it in its own service
    this.campaignSvc.getCampaign(campaignId)
    .subscribe(({type}) => {
      this.router.navigateByUrl(
        this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : `${type}/${campaignId}`
      );
    });
  }
}
