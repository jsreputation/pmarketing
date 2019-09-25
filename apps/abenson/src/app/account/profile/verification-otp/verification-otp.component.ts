import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { of, Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { IChangePhoneData, IChangePasswordData } from '@perx/core/dist/perx-core/lib/auth/authentication/models/authentication.model';
import { ProfileService } from '@perx/core';

@Component({
  selector: 'app-verification-otp',
  templateUrl: './verification-otp.component.html',
  styleUrls: ['./verification-otp.component.scss']
})
export class VerificationOtpComponent implements OnInit {
  public type: string;
  public data: IChangePhoneData | IChangePasswordData;
  public userPhone: string;
  constructor(
    private route: ActivatedRoute,
    private profileService: ProfileService
  ) { }

  public ngOnInit(): void {
    this.profileService.whoAmI().subscribe((user) => this.userPhone = user.phone);
    this.route.params.pipe(switchMap((params) => this.switchType(params.type)))
      .subscribe((data: IChangePhoneData | IChangePasswordData) => this.data = data);
  }
  public get phoneDisplay(): string {
    return this.userPhone && '*'.repeat(this.userPhone.length - 4) + this.userPhone.substr(this.userPhone.length - 4);
  }
  public switchType(type: string): Observable<any> {
    this.type = type;
    switch (type) {
      case 'phone':
        return this.route.queryParams;
      case 'password':
        return of(null);
      default:
        return of(null);
    }
  }

  public update(otp: string): void {
    this.data.otp = otp;
  }

}
