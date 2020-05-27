import { Component, Inject, OnInit, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, Location } from '@angular/common';
import { AuthenticationService, IConfig, ConfigService } from '@perxtech/core';
import { Router } from '@angular/router';
import { VoucherComponent } from './vouchers/voucher/voucher.component';
import { TncComponent } from './tnc/tnc.component';
import { ContactUsComponent } from './contact-us/contact-us.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public title: string = 'prudential';
  public showBack: boolean = false;
  public defaultBackLocation: string = '/vouchers';

  public preAuth: boolean;

  constructor(
    private location: Location,
    private router: Router,
    private authService: AuthenticationService,
    private configService: ConfigService,
    @Inject(PLATFORM_ID) private platformId: object) { }

  public ngOnInit(): void {
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.preAuth = config.preAuth as boolean;
      }
    );

    if (this.preAuth && isPlatformBrowser(this.platformId) && !((window as any).primaryIdentifier)) {
      const param = location.search;
      (window as any).primaryIdentifier = new URLSearchParams(param).get('pi');
      if ((window as any).primaryIdentifier) {
        this.authService.logout();
        this.router.navigate(['login']);
      }
    }
  }

  public goBack(): void {
    this.location.back();
  }

  public onActivate(ref: any): void {
    this.showBack = ref instanceof VoucherComponent ||
      ref instanceof TncComponent ||
      ref instanceof ContactUsComponent;
  }

  public redirectTo(url: string): void {
    if (url !== 'tnc' && url !== 'contact-us') {
      return null;
    }

    this.router.navigateByUrl(
      url,
      {
        replaceUrl: true
      }
    );
  }
}
