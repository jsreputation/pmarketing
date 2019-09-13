import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, IProfile, IChangePasswordData, ProfileService } from '@perx/core';
import { TranslateService } from '@ngx-translate/core';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'hkbn-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public messageSuccess: string;
  public messageError: string;
  public profile: IProfile
  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private translate: TranslateService,
    private dataTransferService: DataTransferService,
    private profileService: ProfileService
  ) {
  }
  public ngOnInit(): void {
    this.profileService.whoAmI().pipe(take(1)).subscribe((prof)=>this.profile = prof);
    this.translate.get(['PASSWORD_SUCCESS_UPDATE', 'INCORRECT_PASSWORD']).subscribe((dictionary) => {
      this.messageSuccess = dictionary.PASSWORD_SUCCESS_UPDATE;
      this.messageError = dictionary.INCORRECT_PASSWORD;
    });
  }

  public changePassword(data: IChangePasswordData): void {
    this.authService.requestVerificationToken(this.profile.phone).subscribe(() => {
      this.dataTransferService.newxUpdateData(data);
      this.router.navigate(['account', 'verify_token', 'password']);
    });
  }
}
