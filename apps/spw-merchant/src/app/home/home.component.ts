import { Component,  } from '@angular/core';
import { AuthenticationService } from '@perxtech/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { MerchantLandingPageComponent } from '@perxtech/bcm-pages';

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
    this.router.navigate(['/identify-user/select-record-type']);
  }

}
