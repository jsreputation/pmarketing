import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@perxtech/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-bcm-pages-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit {

  public greeting: string;

  constructor(
    protected router: Router,
    protected authService: AuthenticationService,
    protected translateService: TranslateService
  ) { }

  public ngOnInit(): void {
    this.translateService
      .get([
        'HOME.GREETING_MORNING',
        'HOME.GREETING_AFTERNOON',
        'HOME.GREETING_EVENING',
      ])
      .subscribe((res: any) => {
        const currentHr = new Date().getHours();
        this.greeting = currentHr < 12 ? res['HOME.GREETING_MORNING'] :  currentHr < 17 ? res['HOME.GREETING_AFTERNOON'] : res['HOME.GREETING_EVENING'];
      });
  }

  public onSalesScan(): void {
    this.router.navigate(['/qrscanner/order']);
  }

  public onRedemption(): void {
    this.router.navigate(['/qrscanner/redeem']);
  }

  public onLogOut(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  public onTransactionHistory(): void {
    this.router.navigate(['/transaction-history']);
  }

}
