import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  authed: boolean;
  preAuth: boolean;
  failedAuth: boolean;

  constructor(private router: Router,
              private fb: FormBuilder) {
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

  onSubmit() {
    this.router.navigate([`game-play/1`]);
  }

}
