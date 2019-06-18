import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.initForm();
  }

  initForm() {
    this.loginForm = this.fb.group({
      playerCode: ['', Validators.required],
      hsbcCardLastFourDigits: ['', Validators.required]
    });
  }

  ngOnInit() {
  }

}
