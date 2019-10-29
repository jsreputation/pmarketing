import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { AuthenticationService } from '@perx/core';

@Component({
  selector: 'app-sms-validation',
  templateUrl: './sms-validation.component.html',
  styleUrls: ['./sms-validation.component.scss']
})
export class SmsValidationComponent implements OnInit {
  private identifier: string;
  private destroy$: Subject<void> = new Subject<void>();
  public code: string;

  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
  ) {
    this.redirectToLogin = this.redirectToLogin.bind(this);
  }

  public get phoneDisplay(): string {
    return this.identifier && '*'.repeat(this.identifier.length - 4) + this.identifier.substr(this.identifier.length - 4);
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

  public validate(code: string): void {
    this.code = code;
  }

  public onSubmit(): void {
    this.authenticationService.verifyOTP(this.identifier, this.code)
      .pipe(switchMap(() => new BehaviorSubject(null)))
      .subscribe(this.redirectToLogin);
  }

  public resendSms(): void {
    this.authenticationService.resendOTP(this.identifier).subscribe(() => {
    });
  }

  public redirectToLogin(): void {
    this.router.navigate(['/login']);
  }
}
