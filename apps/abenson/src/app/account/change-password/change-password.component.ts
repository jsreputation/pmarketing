import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.scss']
})
export class ChangePasswordComponent implements OnInit {
  public passwordChangeForm: FormGroup;
  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.passwordChangeForm = this.fb.group({
      newPassword: [''],
      passwordConfirmation: [''],
      oldPassword: ['']
    });
  }

}
