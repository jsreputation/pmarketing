import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'hkbn-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent {

  public loginForm: FormGroup = new FormGroup({
    user: new FormControl(null, [Validators.required]),
    pass: new FormControl(null, [Validators.required]),
    stayLoggedIn: new FormControl(null)
  });

}
