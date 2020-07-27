import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HkbnValidators } from '../../../helpers/hkbn-validators';
import { ProfileService, NotificationService } from '@perxtech/core';
import { map, flatMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { throwError } from 'rxjs';

@Component({
  selector: 'hkbn-update-email',
  templateUrl: './update-email.component.html',
  styleUrls: ['./update-email.component.scss']
})
export class UpdateEmailComponent implements OnInit {
  public updateEmailGroup: FormGroup = new FormGroup({
    email: new FormControl(null, [HkbnValidators.required, HkbnValidators.email])
  });

  constructor(
    private profileService: ProfileService,
    private router: Router,
    private notification: NotificationService,
    private translateService: TranslateService
  ) {
  }

  public ngOnInit(): void {

    this.profileService.whoAmI().pipe(
      map((profile) => profile.email)
    ).subscribe((email: string) => {
      this.updateEmailGroup.setValue({ email });
    });
  }

  public updateEmail(): void {
    this.profileService.updateUserInfo(this.updateEmailGroup.value)
      .pipe(flatMap(() => this.translateService.get('ACCOUNT_PAGE.EMAIL_SUCCESS_UPDATE')),
        catchError(() => this.translateService.get('ACCOUNT_PAGE.EMAIL_ALREADY_EXISTS').pipe(throwError))).subscribe((message) => {
        this.notification.addSnack(message);
        this.router.navigate(['/account']);
      }, (err) => {
        this.notification.addSnack(err);
      });
  }
}
