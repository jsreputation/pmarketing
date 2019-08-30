import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '@perx/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'hkbn-sms-validation',
  templateUrl: './sms-validation.component.html',
  styleUrls: ['./sms-validation.component.scss']
})
export class SmsValidationComponent implements OnInit, OnDestroy {

  private identifier: string;
  private destroy$: Subject<void> = new Subject<void>();

  constructor(private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) {
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
    // TODO: Remove when methods will be implemented, and we have an ability to get user and password data
    const mockUser = { user: 'John', pass: 'qwerty123' };
    this.authenticationService.verifyOTP(this.identifier, code).pipe(
      mergeMap(
        () => {
          return this.authenticationService.login(mockUser.user, mockUser.pass);
        }
      )).subscribe(
        () => {
          this.router.navigate(['/']);
        }
      );
  }

  public resendSms(): void {
    this.authenticationService.resendOTP(this.identifier).subscribe(() => {
    });
  }
}
