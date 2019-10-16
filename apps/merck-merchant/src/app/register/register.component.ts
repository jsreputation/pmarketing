import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
  ) {
    this.initForm();
  }

  public ngOnInit(): void {
  }

  private initForm(): void {
    this.loginForm = this.fb.group({
      password: ['', Validators.required],
      'confirm-password': ['', Validators.required],
    });
  }

  public onSubmit(): void {

  }
}
