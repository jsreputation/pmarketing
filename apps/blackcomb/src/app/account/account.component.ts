import { Component } from '@angular/core';
import { AuthenticationService } from '@perx/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  constructor(private authenticationService: AuthenticationService, private router: Router) { }

  public logout(): void {
    this.authenticationService.logout();
    this.router.navigate(['/login']);
  }
}
