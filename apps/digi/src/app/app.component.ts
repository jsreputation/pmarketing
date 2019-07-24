import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { AuthenticationService, TokenStorage } from '@perx/core/dist/perx-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'digi';

  preAuth: boolean;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private tokenStorage: TokenStorage,
    @Inject(PLATFORM_ID) private platformId: object) {
    this.preAuth = environment.preAuth;
  }

  ngOnInit(): void {
    if (this.preAuth) {
      if (isPlatformBrowser(this.platformId)) {
        // set global userID var for GA tracking
        if (!((window as any).primaryIdentifier)) {
          const param = location.search;
          const searchParams = new URLSearchParams(param);
          const token = searchParams.get('token');
          if (token) {
            this.tokenStorage.setAccessToken(token);
          }
          (window as any).primaryIdentifier = searchParams.get('pi');

        }
      }
    }
    this.authService.failedAuthObservable.subscribe(
      (didFailAuth) => {
        if (didFailAuth) {
          this.router.navigateByUrl('login');
        }
      }
    );
  }
}
