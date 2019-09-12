import { Component, OnInit } from '@angular/core';
import { ProfileService, AuthenticationService } from '@perx/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { DataTransferService } from 'src/app/services/data-transfer.service';
import { Observable } from 'rxjs';
import { IMessageResponse } from '@perx/core/dist/perx-core/lib/auth/authentication/models/authentication.model';

@Component({
  selector: 'hkbn-verification-otp',
  templateUrl: './verification-otp.component.html',
  styleUrls: ['./verification-otp.component.scss']
})
export class VerificationOtpComponent implements OnInit {
  private type: string;
  private number: string;
  private reqestData: any;
  public get numberDisplay(): string {
    return this.number && this.number.substr(0, this.number.length - 3)
      .replace(/\d/g, '*') + this.number.substr(this.number.length - 3);
  }
  constructor(
    private profileService: ProfileService,
    private authService: AuthenticationService,
    private router: Router,
    private route: ActivatedRoute,
    private dataTransferService: DataTransferService
  ) { }

  public ngOnInit(): void {
    this.dataTransferService.updateData$.subscribe((data) => this.reqestData = data);
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
  public update(otp: string): void {
    this.switchMethod({ ... this.reqestData, ... { otp } }).subscribe((val) => {
    
    })
  }
  private switchMethod(data): Observable<IMessageResponse | void> {
    switch (this.type) {
      case 'password':
        return this.authService.changePassword(data);
      case 'phone':
        return this.authService.changePhone(data);
    }
  }
  public resendSms(): void {
    this.authService.requestVerificationToken().subscribe(() => {
    });
  }
}
