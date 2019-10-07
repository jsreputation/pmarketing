import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { Router } from '@angular/router';
import { AuthenticationService } from '@perx/core';
import { environment } from 'src/environments/environment';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public preAuth: boolean;
  public failedAuth: boolean;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
    this.preAuth = environment.preAuth;
    this.failedAuth = false;
  }

  public ngOnInit(): void {
    if (this.preAuth && isPlatformBrowser(this.platformId) && !this.authService.getUserAccessToken()) {
      this.authService.autoLogin().subscribe(
        () => {
          this.router.navigateByUrl('');
        },
        () => {
          this.failedAuth = true;
        }
      );
    }
  }
}
