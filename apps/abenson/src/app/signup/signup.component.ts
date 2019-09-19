import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignUpComponent implements OnInit {
  public signUpForm: FormGroup;
  public errorMessage: string;

  constructor(private fb: FormBuilder) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public initForm(): void {
    this.signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      secondName: ['', Validators.required],
      mobileNumber: ['', Validators.required],
      pinCode: ['', Validators.required]
    });
  }

  public onSubmit(): void {
    const firstName = (this.signUpForm.get('firstName').value as string);
    const secondName: string = this.signUpForm.get('secondName').value;
    const mobileNumber: string = this.signUpForm.get('mobileNumber').value;
    const pinCode: string = this.signUpForm.get('pinCode').value;
    this.errorMessage = null;

    console.log(firstName, secondName, mobileNumber, pinCode);
  }
}
