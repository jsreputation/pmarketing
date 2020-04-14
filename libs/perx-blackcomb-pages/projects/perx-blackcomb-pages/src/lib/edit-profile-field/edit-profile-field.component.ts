import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  ProfileService
} from '@perxtech/core';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ShowTitleInHeader } from '../layout/layout.component';

export enum FieldType {
  email = 'email',
  postcode = 'postcode',
  nickname = 'nickname'
}

@Component({
  selector: 'perx-blackcomb-pages-edit-profile-field',
  templateUrl: './edit-profile-field.component.html',
  styleUrls: ['./edit-profile-field.component.scss']
})
export class EditProfileFieldComponent implements OnInit, ShowTitleInHeader {

  public fieldType: FieldType;
  public changeEmailForm: FormGroup;
  public changePostcodeForm: FormGroup;
  public changeNicknameForm: FormGroup;
  public showHeaderBelow: boolean;

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initForms();
    const currentNavigation = this.router.getCurrentNavigation();
    if (!currentNavigation) {
      return;
    }
    if (currentNavigation.extras.state) {
      if (currentNavigation.extras.state.showHeaderBelow) {
        this.showHeaderBelow = true;
      }
    }
  }

  private initForms(): void {
    this.changeEmailForm = this.fb.group({
      email: ['', Validators.email]
    });

    this.changePostcodeForm = this.fb.group({
      postcode: ['', Validators.required]
    });

    this.changeNicknameForm = this.fb.group({
      nickname: ['', Validators.required]
    });
  }

  public ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      if (params.get('type') !== null) {
        this.fieldType = params.get('type') as FieldType;
      }
    });
  }

  public onSubmit(): void {
    if (this.fieldType === FieldType.email) {
      this.profileService.updateUserInfo(this.changeEmailForm.value)
        .subscribe(() => this.router.navigate(['profile']));
    } else if (this.fieldType === FieldType.postcode) {
      this.profileService.setCustomProperties(this.changePostcodeForm.value)
        .subscribe(() => this.router.navigate(['profile']));
    } else if (this.fieldType === FieldType.nickname) {
      this.profileService.setCustomProperties(this.changeNicknameForm.value)
        .subscribe(() => this.router.navigate(['profile']));
    }
  }

  public getTitle(): string {
    if (this.fieldType) {
      return `Edit Profile ${this.fieldType.charAt(0).toUpperCase() + this.fieldType.slice(1)}`;
    }
    return 'Edit Profile';
  }
}
