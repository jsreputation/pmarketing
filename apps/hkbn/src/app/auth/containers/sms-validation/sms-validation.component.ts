import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthenticationService } from '@perx/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { takeUntil, mergeMap } from 'rxjs/operators';
import { DataTransferService } from 'src/app/services/data-transfer.service';

@Component({
  selector: 'hkbn-sms-validation',
  templateUrl: './sms-validation.component.html',
  styleUrls: ['./sms-validation.component.scss']
})
export class SmsValidationComponent implements OnInit, OnDestroy {

  private identifier: string;
  private destroy$: Subject<void> = new Subject<void>();
  private number: string;
  constructor(
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router,
    private dataTransferService: DataTransferService
  ) {
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
    this.authenticationService.verifyOTP(this.identifier, code).subscribe(
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
