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
} from '@angular/forms';

import { Subject, throwError } from 'rxjs';
import { Config, AuthenticationService, PopupComponent, IPopupConfig, InstantOutcomeService, IGameService } from '@perx/core';
import { MatDialog } from '@angular/material';
import { switchMap, takeUntil, catchError, tap } from 'rxjs/operators';

@Component({
  selector: 'perx-blackcomb-pages-pi',
  templateUrl: './pi.component.html',
  styleUrls: ['./pi.component.scss']
})
export class PIComponent implements OnInit, OnDestroy {
  public PIForm: FormGroup;
  public errorMessage: string;
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
    private dialog: MatDialog,
    private router: Router,
    private route: ActivatedRoute,
    private gameService: IGameService,
    private instantOutcomeService: InstantOutcomeService,
    private translate: TranslateService,
    private authService: AuthenticationService
  ) {
    this.preAuth = this.config ? this.config.preAuth : false;
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

  public onSubmit(): void {
    const pi: string = (this.PIForm.get('pi').value as string);
    this.errorMessage = null;

    if (pi) {
      const oldUserId = this.authService.getUserId();
      let newUserId;
      (window as any).primaryIdentifier = pi;
      this.authService.autoLogin().pipe(
        catchError(() => throwError('PI_NOT_EXIST')),
        tap(() => { newUserId = this.authService.getUserId(); }),
        switchMap(() => this.authService.mergeUserById([oldUserId], newUserId)),
        catchError(() => throwError('PI_MERGE_FAIL')),
        tap(() => this.authService.savePI(pi)),
        switchMap(() => {
          if (this.engagementType === 'game' && this.transactionId) {
            return this.gameService.prePlayConfirm(this.transactionId);
          }
          if (this.engagementType === 'instant_outcome' && this.transactionId) {
            return this.instantOutcomeService.prePlayConfirm(this.transactionId);
          }
          return throwError('PI_NO_TRANSACTION_MATCH');
        }),
        catchError(() => throwError('PI_TRANSACTION_CONFIRM_FAIL')),
      ).subscribe(
        () => {
          this.router.navigate(['/wallet']);
          this.dialog.open(PopupComponent, { data: this.popupData });
        },
        (error) => {
          this.updateErrorMessage(error);
        }
      );
    }
  }

  public updateErrorMessage(error: string): void {
    this.translate.get(error).subscribe(res => this.errorMessage = res);
  }
}
