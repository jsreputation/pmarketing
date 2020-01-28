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
import { ProfileService } from '@perx/core';
import { Router } from '@angular/router';

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
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.emailChangeForm = this.fb.group({
      email: ['', Validators.required]
    });
    this.profileService.whoAmI()
      .subscribe((profile) => this.emailChangeForm.setValue({ email: profile.email }));

  }

  public onSubmit(): void {
    this.profileService.updateUserInfo(this.emailChangeForm.value)
      .subscribe(() => this.router.navigate(['account']));
  }
}
