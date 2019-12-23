import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute} from '@angular/router';
import {
  ProfileService
} from '@perx/core';

import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { ShowTitleInHeader } from '../layout/layout.component';

export enum FieldType {
  email = 'email',
  postcode = 'postcode'
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

  constructor(
    private fb: FormBuilder,
    private profileService: ProfileService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.initForms();
  }

  private initForms(): void {
    this.changeEmailForm = this.fb.group({
      email: ['', Validators.email]
    });

    this.changePostcodeForm = this.fb.group({
      postcode: ['', Validators.required]
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
    }
  }

  public getTitle(): string {
    return 'Edit Profile';
  }
}
