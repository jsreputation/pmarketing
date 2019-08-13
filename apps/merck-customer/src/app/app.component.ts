import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { AuthenticationService, NotificationService } from '@perx/core';
import {
  PageProperties,
  BarSelectedItem,
  PageAppearence } from './page-properties';
import { isPlatformBrowser } from '@angular/common';
import { environment } from '../environments/environment';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { CustomSnackbarComponent } from './custom-snackbar/custom-snackbar.component';
import { Location } from '@angular/common';

@Component({
  selector: 'mc-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public leftIconToShow: string = '';
  public rightIconToShow: string = '';

  // Default Values
  public pageProperties: PageProperties = {
    header: false,
    backButtonEnabled: false,
    bottomSelectedItem: BarSelectedItem.HOME,
    pageTitle: ''
  };

  private preAuth: boolean;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    @Inject(PLATFORM_ID) private platformId: object,
    private notificationService: NotificationService,
    private snackBar: MatSnackBar,
    private location: Location
  ) {
      this.preAuth = environment.preAuth;
      this.notificationService.$snack.subscribe((message: string) => {
      this.snackBar.openFromComponent(CustomSnackbarComponent, {
        data: {
          message,
          icon: 'clear',
        },
        duration: 4000,
      });
    });
  }

  public ngOnInit(): void {
    if (!this.preAuth) {
      return;
    }

    if (isPlatformBrowser(this.platformId) && !((window as any).primaryIdentifier)) {
      const param = location.search;
      (window as any).primaryIdentifier = new URLSearchParams(param).get('pi');
    }

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

  public onActivate(ref: any): void {
    const activeComponent = ref as PageAppearence;
    this.pageProperties = activeComponent.getPageProperties();
    this.leftIconToShow =  this.pageProperties.backButtonEnabled ? 'arrow_back_ios' : '';
  }

  public onLeftActionClick(): void {
    this.location.back();
  }

  public onTabNavigate(path: string): void {
    this.router.navigate([path]);
  }
}
