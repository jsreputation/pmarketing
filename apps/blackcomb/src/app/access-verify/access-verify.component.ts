import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '@perxtech/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-access-verify',
  templateUrl: './access-verify.component.html',
  styleUrls: ['./access-verify.component.scss']
})
export class AccessVerifyComponent implements OnInit {

  constructor(
    private router: Router,
    private authService: AuthenticationService) { }

  public ngOnInit(): void {
    const token = sessionStorage.getItem('jwt_token');
    if (token) {
      this.authService.getExchangeToken(token).subscribe(() => {
        this.router.navigate(['/home']);
      },
      () => this.router.navigate(['/error']));
   }
  }

}
