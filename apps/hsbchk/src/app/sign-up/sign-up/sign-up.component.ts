import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import {AuthenticationService, NotificationService, ThemesService} from '@perxtech/core';
import { ISignUpComponent } from './i-sign-up.component';
import {MatDialog} from '@angular/material';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent extends ISignUpComponent implements OnInit, OnDestroy {
  constructor(
    protected fb: FormBuilder,
    protected router: Router,
    protected themesService: ThemesService,
    protected authService: AuthenticationService,
    protected notificationService: NotificationService,
    protected dialog: MatDialog
  ) {
    super(fb, router, themesService, authService, notificationService, dialog);
    this.initForm();
    this.getAppToken();
  }

  public ngOnInit(): void {
    this.initForm();
    this.fetchTheme();
  }

  protected get mobileNumber(): string {
    return `852${this.signupForm.value.mobileNo}`;
  }
}
