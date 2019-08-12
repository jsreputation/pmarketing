import { Component } from '@angular/core';
import { AuthenticationService } from '@perx/core';
import { LoginFormValue } from '../../components/login-form/login-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'hkbn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public authed: boolean;

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  public async login(data: LoginFormValue): Promise<void> {
    this.authed = await this.authService.v4GameOauth(data.user, data.pass);

    if (!((window as any).primaryIdentifier)) {
      (window as any).primaryIdentifier = data.user;
    }

    if (this.authService.getInterruptedUrl()) {
      this.router.navigate([this.authService.getInterruptedUrl()]);
    } else {
      this.router.navigate(['/']);
    }
  }

  public forgotPassword(identifier: string = ''): void {
    this.router.navigate(['/forgot-password'], {
      queryParams: {
        identifier
      }
    });
  }

}
