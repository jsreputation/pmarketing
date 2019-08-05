import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '@perx/core';

@Component({
  selector: 'hkbn-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent {
  constructor(private router: Router, private authService: AuthenticationService) {
  }

  // public changePassword(data: any): void {
  //   this.authService.changePassword(data.oldPassword, data.newPassword).subscribe(() => {
  //     this.router.navigate(['/account']);
  //   });
  // }
}
