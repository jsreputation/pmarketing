import { ActivatedRoute, Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import {
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl,
} from '@angular/forms';

import { Subject, iif, of } from 'rxjs';
import { Config, AuthenticationService, IPopupConfig, InstantOutcomeService, IGameService, NotificationService } from '@perx/core';
import { switchMap, takeUntil, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'perx-blackcomb-pages-pi',
  templateUrl: './pi.component.html',
  styleUrls: ['./pi.component.scss']
})
export class PIComponent implements OnInit, OnDestroy {
  public PIForm: FormGroup;
  public errorMessage: string | null = null;
  public preAuth: boolean;
  public failedAuth: boolean;
  private destroy$: Subject<any> = new Subject();
  private popupData: IPopupConfig;
  private engagementType: string;
  private transactionId: number;

  private initForm(): void {
    this.PIForm = this.fb.group({
      pi: ['', Validators.required],
    });
  }

  constructor(
    private fb: FormBuilder,
    private config: Config,
    private router: Router,
    private route: ActivatedRoute,
    private gameService: IGameService,
    private instantOutcomeService: InstantOutcomeService,
    private translate: TranslateService,
    private authService: AuthenticationService,
    private notificationService: NotificationService
  ) {
    this.preAuth = this.config.preAuth || false;
  }

  public ngOnInit(): void {
    this.initForm();
    this.route.queryParams.pipe(
      takeUntil(this.destroy$)
    ).subscribe((params) => {
      if (params && params.popupData) {
        this.popupData = JSON.parse(params.popupData);
      }
      if (params && params.engagementType) {
        this.engagementType = params.engagementType;
      }
      if (params && params.transactionId) {
        this.transactionId = parseInt(params.transactionId, 10);
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get piField(): AbstractControl {
    return this.PIForm.get('pi') as AbstractControl;
  }

  public onSubmit(): void {
    const pi: string | null = this.piField.value as string;
    this.errorMessage = null;

    if (pi) {
      const oldUserId = this.authService.getUserId();
      if (!oldUserId) {
        throw new Error('should not be here');
      }
      const oldPI = this.authService.getPI();
      const oldToken = this.authService.getUserAccessToken();
      const oldAnonymousStatus = this.authService.getAnonymous();
      let newUserId;
      let newToken;
      (window as any).primaryIdentifier = pi;
      this.authService.autoLogin().pipe(
        catchError(() => { throw new Error('PI_NOT_EXIST'); }),
        tap(() => {
          if (oldAnonymousStatus) {
            newUserId = this.authService.getUserId();
            newToken = this.authService.getUserAccessToken();
            this.authService.savePI(oldPI);
            this.authService.saveUserId(oldUserId);
            this.authService.saveUserAccessToken(oldToken);
          }
        }),
        switchMap((res) => iif(() => this.authService.getAnonymous(), this.authService.mergeUserById([oldUserId], newUserId), of(res))),
        catchError((err: Error) => {
          throw err.message.startsWith('PI_') ? err : new Error('PI_MERGE_FAIL');
        }),
        tap(() => {
          if (oldAnonymousStatus) {
            this.authService.savePI(pi);
            this.authService.saveUserId(newUserId);
            this.authService.saveUserAccessToken(newToken);
            this.authService.saveAnonymous(false);
          }
        }),
        switchMap(() => {
          if (this.engagementType === 'game' && this.transactionId) {
            return this.gameService.prePlayConfirm(this.transactionId);
          }
          if (this.engagementType === 'instant_outcome' && this.transactionId) {
            return this.instantOutcomeService.prePlayConfirm(this.transactionId);
          }
          throw new Error('PI_NO_TRANSACTION_MATCH');
        }),
        catchError((err: Error) => {
          throw err.message.startsWith('PI_') ? err : new Error('PI_TRANSACTION_CONFIRM_FAIL');
        }),
      ).subscribe(
        () => {
          this.router.navigate(['/wallet']);
          if (this.popupData) {
            this.notificationService.addPopup(this.popupData);
          }
        },
        (error: Error) => this.updateErrorMessage(error.message)
      );
    }
  }

  public updateErrorMessage(error: string): void {
    this.translate.get(error).subscribe(res => this.errorMessage = res);
  }
}
