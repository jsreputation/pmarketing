import { Component, OnInit } from '@angular/core';
import { ProfileService, AuthenticationService } from '@perx/core';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'hkbn-verification-otp',
  templateUrl: './verification-otp.component.html',
  styleUrls: ['./verification-otp.component.scss']
})
export class VerificationOtpComponent implements OnInit {
  private type: string;
  private number: string;
  public get numberDisplay(): string {
    return this.number && this.number.substr(0, this.number.length - 3)
      .replace(/\d/g, '*') + this.number.substr(this.number.length - 3);
  }
  constructor(
    private profileService: ProfileService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    this.route.params.subscribe((param: Params) => this.type = param.id);
    this.profileService.whoAmI().subscribe((profile) =>
      this.number = profile && profile.phone
    );
  }
  public validate(otp: string): void {
    this.authService.verifyOTP(this.number, otp).subscribe(() => {
      this.router.navigate(['account', this.type], { queryParams: { otp } });
    });
  }
  public resendSms(): void {
    this.authService.requestVerificationToken(this.number).subscribe(()=>{
    });
  }
}
