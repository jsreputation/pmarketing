import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { PageProperties, BAR_SELECTED_ITEM } from './page-properties';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';
import { AuthenticationService } from '@perx/core';
import { Router } from '@angular/router';

@Component({
  selector: 'mc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public showHeader: boolean = false;
  public showBottomBar: boolean = false;
  public isHomeComponent: boolean = false;
  private preAuth: boolean;
  public currentSelectedItem: BAR_SELECTED_ITEM = BAR_SELECTED_ITEM.NONE;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: object
  ) {
      this.preAuth = environment.preAuth;
  }

  public ngOnInit(): void {
    if (this.preAuth && isPlatformBrowser(this.platformId) && !((window as any).primaryIdentifier)) {
      const param = location.search;
      (window as any).primaryIdentifier = new URLSearchParams(param).get('pi');
    }
    if (this.preAuth) {
      if (isPlatformBrowser(this.platformId) && !this.authService.authing) {

        this.authService.isAuthorized().subscribe(
          authed => {
            if (!authed) {
              this.authService.v4AutoLogin().then(
                (isAuthed: boolean) => {
                  if (isAuthed) {
                    this.router.navigateByUrl('/home');
                  }
                },
                () => {
                  console.log('Error failed to authenticate.');
                }
              );
            } else {
              this.router.navigateByUrl('/home');
            }
          },
        );
      }
    }
  }

  public onActivate(ref: any): void {
    const activeComponent = ref as PageProperties;
    this.showHeader = activeComponent.showHeader();
    this.currentSelectedItem = activeComponent.bottomSelectedItem();
  }
}
