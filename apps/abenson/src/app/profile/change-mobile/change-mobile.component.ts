import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from '@perxtech/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-change-mobile',
  templateUrl: './change-mobile.component.html',
  styleUrls: ['./change-mobile.component.scss']
})
export class ChangeMobileComponent implements OnInit {
  public phoneForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.phoneForm = this.fb.group({
      phone: [ '', [ Validators.required, Validators.pattern('^[0-9]*$') ]]
    });
  }

  public requestOtp(): void {
    if(this.phoneForm.valid){
      this.auth.requestVerificationToken(this.phoneForm.value.phone).subscribe(() => {
        this.router.navigate(['/profile', 'verify-otp', 'phone'], { queryParams: this.phoneForm.value });
      });
    }
  }
}
