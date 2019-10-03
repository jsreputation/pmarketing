import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../auth/authentication/authentication.service';
import { ICampaignService } from '../../campaign/icampaign.service';

@Component({
  selector: 'perx-core-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.scss']
})
export class LoadingComponent implements OnInit {
  public preAuth: boolean;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private campaignSvc: ICampaignService
  ) {
  
  }
  public ngOnInit(): void {
    // if (this.preAuth && isPlatformBrowser(this.platformId) && (window as any).primaryIdentifier) {
    //   this.authService.autoLogin()
    //     .subscribe(
    //       () => this.redirectAfterLogin(),
    //       () => this.router.navigate(['/login'])
    //     );
    // } else {
    //   this.router.navigate(['/login']);
    // }
    this.router.navigate(['/login']);
  }

  public redirectAfterLogin(): void {
    const campaignId = (window as any).campaignId;
    this.campaignSvc.getCampaign(campaignId)
    .subscribe(({type}) => {
      this.router.navigateByUrl(
        this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : `${type}/${campaignId}`
      );
    });
  }
}
