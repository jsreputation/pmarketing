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

  public login(data: LoginFormValue): void {
    this.authService.v4GameOauth(data.user, data.pass).then((isAuthed: boolean) => {
      this.authed = isAuthed;

      if (!((window as any).primaryIdentifier)) {
        (window as any).primaryIdentifier = data.user;
      }

      if (this.authService.getInterruptedUrl()) {
        this.router.navigateByUrl(this.authService.getInterruptedUrl());
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }

  public forgotPassword(identifier: string = ''): void {
    this.router.navigate(['/forgot-password'], {
      queryParams: {
        identifier
      }
    });
  }

}
