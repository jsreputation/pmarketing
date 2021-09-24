import { Component,  } from '@angular/core';
import { MerchantLandingPageComponent } from '@perxtech/bcm-pages';
import { AuthenticationService } from '@perxtech/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent extends MerchantLandingPageComponent {

  constructor(
    router: Router,
    authService: AuthenticationService,
    translate: TranslateService
  ) {
    super(router, authService, translate);
   }

  public onSalesScan(): void {
    this.router.navigate(['/identify-user/order']);
  }

}
