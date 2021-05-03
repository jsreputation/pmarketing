import {
  Component,
  OnInit,
} from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import {
  ProfileService,
  NotificationService
} from '@perxtech/core';
import { Location } from '@angular/common';
import { EMAIL_VALIDATION_REGEX } from '../../app.constants';

@Component({
  selector: 'app-change-email',
  templateUrl: './change-email.component.html',
  styleUrls: ['./change-email.component.scss']
})
export class ChangeEmailComponent implements OnInit {
  public emailChangeForm: FormGroup;

  public get email(): AbstractControl | null {
    return this.emailChangeForm.get('email');
  }

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private location: Location,
    private ntfcService: NotificationService,
  ) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.emailChangeForm = this.fb.group({
      email: ['', [Validators.required, Validators.pattern(EMAIL_VALIDATION_REGEX)]]
    });
    this.profileService.whoAmI()
      .subscribe((profile) => this.emailChangeForm.setValue({ email: profile.email }));
  }

  public onSubmit(): void {
    this.profileService.updateUserInfo(this.emailChangeForm.value)
      .subscribe(() => {
        this.location.back();
        setTimeout(() => {
          this.ntfcService.addPopup({ title: 'Success', text: 'Your email address was updated' });
        }, 50);
      },
        (err) => {
          if (err.error && err.error.message) {
            this.ntfcService.addSnack(err.error.message);
          }
        });
  }
}
