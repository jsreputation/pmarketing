import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, Location } from '@angular/common';
import { environment } from '../environments/environment';
import { AuthenticationService } from '@perx/core/dist/perx-core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { VoucherComponent } from './vouchers/voucher/voucher.component';
import { TncComponent } from './tnc/tnc.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

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
  failedAuthSubscriber: Subscription;

  constructor(private location: Location,
              private router: Router,
              private authService: AuthenticationService,
              @Inject(PLATFORM_ID) private platformId: object) {
    this.preAuth = environment.preAuth;
  }

  ngOnInit(): void {
    if (this.preAuth) {
      if (isPlatformBrowser(this.platformId)) {
        // set global userID var for GA tracking
        if (!((window as any).primaryIdentifier)) {
          const param = location.search;
          (window as any).primaryIdentifier = new URLSearchParams(param).get('pi');
        }
      }
    }
    this.failedAuthSubscriber = this.authService.failedAuthObservable.subscribe(
      (didFailAuth) => {
        if (didFailAuth) {
          this.router.navigateByUrl('login');
        }
      }
    );
  }

  goBack() {
    this.location.back();
  }

  onActivate(ref: any) {
    this.showBack = ref instanceof VoucherComponent ||
                    ref instanceof TncComponent ||
                    ref instanceof ContactUsComponent;
  }

  replaceUrl(): boolean {
    const path = this.location.path();
    if (path === '/tnc' || path === '/contact-us') {
      return true;
    }

    return false;
  }
}
