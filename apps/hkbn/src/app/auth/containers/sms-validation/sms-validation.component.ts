import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService, NotificationService, ISignUpData } from '@perx/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, Observable, of } from 'rxjs';
import { takeUntil, switchMap } from 'rxjs/operators';
import { DataTransferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'hkbn-sms-validation',
  templateUrl: './sms-validation.component.html',
  styleUrls: ['./sms-validation.component.scss']
})
export class SmsValidationComponent implements OnInit, OnDestroy {

  private identifier: string;
  private destroy$: Subject<void> = new Subject<void>();
  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private dataTransfer: DataTransferService,
    private notificationService: NotificationService
  ) {
    this.redirectAfterLogin = this.redirectAfterLogin.bind(this);
    this.login = this.login.bind(this);
    this.errorHandling = this.errorHandling.bind(this);
  }

  public ngOnInit(): void {
    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      if (params && params.identifier) {
        this.identifier = params.identifier;
        this.destroy$.next();
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.complete();
  }

  public validate(code: string): void {
    this.authenticationService.verifyOTP(this.identifier, code)
      .pipe(switchMap(() => this.dataTransfer.updateData$))
      .pipe(switchMap(this.login)).subscribe(this.redirectAfterLogin, this.errorHandling);
  }

  public login(val: ISignUpData): Observable<any> {
    if (!val) {
      return of(null);
    }
    return this.authenticationService.login(val.phone, val.password);
  }

  private errorHandling(): void {
    this.notificationService.addPopup({
      title: 'We could not reach the server',
      text: 'Please try again soon'
    });
  }
  public redirectAfterLogin(): void {
    this.router.navigateByUrl(this.authenticationService.getInterruptedUrl() ? this.authenticationService.getInterruptedUrl() : 'home');
  }
  public resendSms(): void {
    this.authenticationService.resendOTP(this.identifier).subscribe(() => {
    });
  }
  public goBack(): void {
    this.router.navigate(['registration']);
  }
}
