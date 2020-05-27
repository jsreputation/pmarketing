import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService, IProfile, IChangePasswordData, ProfileService } from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';
import { DataTransferService } from '../../../services/data-transfer.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'hkbn-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public messageSuccess: string;
  public messageError: string;
  public profile: IProfile;
  public cache: IChangePasswordData;

  constructor(
    private router: Router,
    private authService: AuthenticationService,
    private translate: TranslateService,
    private dataTransferService: DataTransferService,
    private profileService: ProfileService
  ) {
  }
  public ngOnInit(): void {
    this.dataTransferService.updateData$.subscribe((data: IChangePasswordData) => this.cache = data);
    this.profileService.whoAmI().pipe(take(1)).subscribe((prof) => this.profile = prof);
    this.translate.get(['CHANGE_PW_PAGE.PASSWORD_SUCCESS_UPDATE', 'CHANGE_PW_PAGE.INCORRECT_PASSWORD']).subscribe((dictionary) => {
      this.messageSuccess = dictionary['CHANGE_PW_PAGE.PASSWORD_SUCCESS_UPDATE'];
      this.messageError = dictionary['CHANGE_PW_PAGE.INCORRECT_PASSWOR'];
    });
  }

  public changePassword(data: IChangePasswordData): void {
    this.authService.requestVerificationToken().subscribe(() => {
      this.dataTransferService.newxUpdateData(data);
      this.router.navigate(['account', 'verify_token', 'password']);
    });
  }
}
