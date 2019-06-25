import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, Location } from '@angular/common';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'prudential';
  showBack = false;
  defaultBackLocation = '/vouchers';

  preAuth: boolean;

  constructor(private location: Location,
              @Inject(PLATFORM_ID) private platformId: object) {
    this.preAuth = environment.preAuth;
  }

  ngOnInit(): void {
    if (this.preAuth) {
      if (isPlatformBrowser(this.platformId)) {
        // save current url's params
        if (!((window as any).primaryIdentifier)) {
          const param = location.search;
          (window as any).primaryIdentifier = new URLSearchParams(param).get('pi');
        }
      }
    }
  }

  goBack() {
    this.location.back();
  }

  onActivate(ref: any) {
    if (!ref.constructor) {
      return;
    }

    switch (ref.constructor.name) {
      case 'TncComponent': {
        this.showBack = true;
        break;
      }
      case 'ContactUsComponent': {
        this.showBack = true;
        break;
      }
      case 'VoucherComponent': {
        this.showBack = true;
        break;
      }
      default: {
        this.showBack = false;
        break;
      }
    }
  }

  replaceUrl(): boolean {
    const path = this.location.path();
    if (path === '/tnc' || path === '/contact-us') {
      return true;
    }

    return false;
  }
}
