import { Component, Inject, PLATFORM_ID, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@perx/core';
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
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.preAuth = environment.preAuth;
  }
  public ngOnInit(): void {
    if (this.preAuth && isPlatformBrowser(this.platformId)) {
      this.authService.autoLogin()
      .subscribe(
        () => this.redirectAfterLogin(),
        () => this.router.navigate(['/login'])
      );
    }
  }

  public redirectAfterLogin(): void {
    const campaignId = (window as any).campaignId;
    this.router.navigateByUrl(this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : 'survey/' + campaignId);
  }
}
