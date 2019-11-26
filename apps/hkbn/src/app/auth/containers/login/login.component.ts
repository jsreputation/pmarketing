import { Component, OnInit } from '@angular/core';
import { AuthenticationService, NotificationService } from '@perx/core';
import { LoginFormValue } from '../../components/login-form/login-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'hkbn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  public appAccessToken: string;
  constructor(private authService: AuthenticationService, private router: Router, private nofifcationService: NotificationService) {
  }
  public ngOnInit(): void {
    this.authService.getAppToken().subscribe((res) => {
      this.appAccessToken = res.access_token;
    }, (err) => {
      console.error('Error' + err);
    });
  }
  public login(data: LoginFormValue): void {
    this.authService.login(data.user, data.pass).subscribe(
      () => {
        this.router.navigate([this.authService.getInterruptedUrl() ? this.authService.getInterruptedUrl() : '/']);
      },
      (err) => {
        this.nofifcationService.addSnack(err.error.message);
      }
    );

    if (!((window as any).primaryIdentifier)) {
      (window as any).primaryIdentifier = data.user;
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
