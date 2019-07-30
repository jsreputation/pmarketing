import { Component } from '@angular/core';
import { AuthenticationService } from '@perx/core/dist/perx-core';
import { Router } from '@angular/router';

@Component({
  selector: 'hkbn-sms-validation',
  templateUrl: './sms-validation.component.html',
  styleUrls: ['./sms-validation.component.scss']
})
export class SmsValidationComponent {

  constructor(private authenticationService: AuthenticationService,
              private router: Router) {
  }

  public validate(code: string): void {
    // TODO: Remove when methods will be implemented, and we have an ability to get user and password data
    const mockIdentifier = 'qwerty123';
    const mockUser = {user: 'John', pass: 'qwerty123'};
    this.authenticationService.verifyOTP(mockIdentifier, code).subscribe(() => {
      const authorized = this.authenticationService.v4GameOauth(mockUser.user, mockUser.pass);
      if (authorized) {
        this.router.navigate(['/']);
      }
    });
  }

  public resendSms(): void {
    const mockIdentifier = 'qwerty123';
    this.authenticationService.resendOTP(mockIdentifier).subscribe(() => {
    });
  }
}
