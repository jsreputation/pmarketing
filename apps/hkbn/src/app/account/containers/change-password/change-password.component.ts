import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, NotificationService } from '@perx/core';
import { IChangePasswordData } from '@perx/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'hkbn-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public messageSuccess: string;
  public messageError: string;
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private ntfc: NotificationService,
    private translate: TranslateService
  ) {
  }
  public ngOnInit(): void {
    this.translate.get(['PASSWORD_SUCCESS_UPDATE', 'INCORRECT_PASSWORD']).subscribe((dictionary) => {
      this.messageSuccess = dictionary.PASSWORD_SUCCESS_UPDATE;
      this.messageError = dictionary.INCORRECT_PASSWORD;
    });
  }

  public changePassword(data: IChangePasswordData): void {
    this.authService.changePassword(data).subscribe(() => {
      this.ntfc.addSnack(this.messageSuccess);
      this.router.navigate(['/account']);
    }, () =>
        this.ntfc.addSnack(this.messageError)
    );
  }
}
