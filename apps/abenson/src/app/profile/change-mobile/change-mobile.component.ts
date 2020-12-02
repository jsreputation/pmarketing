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
    private bf: FormBuilder,
    private auth: AuthenticationService,
    private router: Router
  ) { }

  public ngOnInit(): void {
    this.phoneForm = this.bf.group({
      phone: ['', [Validators.required]]
    });
  }

  public requestOtp(): void {
    this.auth.requestVerificationToken(this.phoneForm.value.phone).subscribe(() => {
      this.router.navigate(['account', 'profile', 'verify-otp', 'phone'], { queryParams: this.phoneForm.value });
    });
  }
}
