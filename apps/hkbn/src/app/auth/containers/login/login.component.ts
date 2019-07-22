import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../../../../../libs/perx-core/dist/perx-core';
import { LoginFormValue } from '../../components/login-form/login-form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'hkbn-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public authed: boolean;

  constructor(private authService: AuthenticationService, private router: Router) {
  }

  public ngOnInit(): void {
    console.log(this.authService);
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
        this.router.navigateByUrl('puzzle');
      }
    });
  }

}
