import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, of } from 'rxjs';
import { takeUntil, map, filter, catchError, mergeMap } from 'rxjs/operators';
import { AuthenticationService, LoyaltyService, isEmptyArray, ILoyalty, ProfileService, NotificationService } from '@perx/core';
import { SharedData, SharedDataService } from '../shared-data.service';

@Component({
  selector: 'app-sms-validation',
  templateUrl: './sms-validation.component.html',
  styleUrls: ['./sms-validation.component.scss']
})
export class SmsValidationComponent implements OnInit {
  private identifier: string;
  private destroy$: Subject<void> = new Subject<void>();
  public code: string;
  private appAccessTokenFetched: boolean = false;
  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private loyaltyService: LoyaltyService,
    private profileService: ProfileService,
    private notification: NotificationService,
    private sharedDataService: SharedDataService
  ) {
    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  public get phoneDisplay(): string {
    return this.identifier && '*'.repeat(this.identifier.length - 4) + this.identifier.substr(this.identifier.length - 4);
  }

  public ngOnInit(): void {

    const token = this.authenticationService.getAppAccessToken();
    if (token) {
      this.appAccessTokenFetched = true;
    } else {
      this.authenticationService.getAppToken().subscribe(() => {
        this.appAccessTokenFetched = true;
      }, (err) => {
        console.error('Error' + err);
      });
    }

    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      if (params && params.identifier) {
        this.identifier = params.identifier;
        this.destroy$.next();
      }
    });
  }

  public validate(code: string): void {
    this.code = code;
  }

  public onSubmit(): void {
    this.authenticationService.verifyOTP(this.identifier, this.code)
      .pipe(
        mergeMap(() => this.sharedDataService.storedData),
        mergeMap((data) => this.setCardNumber(data)))
      .subscribe((result) => this.redirectToLogin(result));
  }

  public resendSms(): void {
    this.authenticationService.resendOTP(this.identifier).subscribe(() => {
    });
  }

  public redirectToLogin(result: boolean): void {
    if (result) {
      this.router.navigate(['/home']);
    } else {
      this.router.navigate(['/login']);
    }

  }

  private setCardNumber(data?: SharedData): Observable<any> {
    if (!data || !data.cardNumber || !this.appAccessTokenFetched) {
      return of(false);
    }
    return this.authenticationService.login(data.phone, data.password).pipe(
      map((val) => val),
      mergeMap(() => this.loyaltyService.getLoyalties()),
      map((loyalties) => !isEmptyArray(loyalties) && loyalties[0]),
      filter((loyalty) => !!loyalty),
      mergeMap((loyalty: ILoyalty) => {
        const cardNumberData = {
          cardNumber: parseInt(data.cardNumber, 10),
          loyaltyProgramId: loyalty.id,
        };
        return this.profileService.setCardNumber(cardNumberData);
      }),
      map(() => true),
      catchError((err) => {
        this.notification.addSnack(err.message);
        return of(false);
      })
    );

  }
}
