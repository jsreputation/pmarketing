import { Component, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { IProfile, AuthenticationService } from '@perx/core';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'hkbn-account-summary',
  templateUrl: './account-summary.component.html',
  styleUrls: ['./account-summary.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AccountSummaryComponent implements OnChanges {
  @Input() public accountData: IProfile;

  constructor(
    public authService: AuthenticationService,
    public router: Router
  ) { }

  public accountSummary: FormGroup = new FormGroup({
    firstName: new FormControl(),
    lastName: new FormControl(),
    phone: new FormControl(''),
    email: new FormControl(),
    pass: new FormControl(),
    customProperties: new FormControl()
  });

  public ngOnChanges(): void {
    if (this.accountData) {
      this.accountSummary.patchValue(this.accountData);
    }
  }

  public updateMobileVerification(event: Event): void {
    event.preventDefault();
    this.authService.requestVerificationToken().pipe(catchError(() => {
      return of(null);
    })).subscribe(() => {
      this.router.navigate(['account/verify_token']);
    });
  }
}
