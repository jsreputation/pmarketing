import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
// import { Router } from '@angular/router';

@Component({
  selector: 'mc-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss']
})
export class UserInfoComponent implements OnInit {

  public surveyForm: FormGroup;

  constructor(
    // private router: Router,
    private fb: FormBuilder
  ) {
        this.initForm();
  }

  private initForm(): void {
    this.surveyForm = this.fb.group({
      // diabetes: false // ,
      // pre_diabetes: false,
      // hypertension: false
    });
  }
  public ngOnInit(): void {}

  public onNext(): void {

  }

}
