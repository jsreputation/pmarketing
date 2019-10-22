import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { filter, map, switchMap, takeUntil, tap } from 'rxjs/operators';
import { TierSetupPopupComponent } from 'src/app/loyalty/containers/tier-setup-popup/tier-setup-popup.component';
import { LoyaltyFormsService } from '../../services/loyalty-forms.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { LoyaltyStepForm } from '../../models/loyalty-step-form.enum';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UserService } from '@cl-core/services/user.service';
import { Observable, of, Subject } from 'rxjs';
import { AudiencesService } from '@cl-core-services';
import { NewLoyaltyActions } from '../../models/new-loyalty-actions.enum';
import { LoyaltyService } from '@cl-core/services/loyalty.service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CustomDataSource } from '@cl-shared/table';
import { LoyaltyCustomTierService } from '@cl-core/services/loyalty-custom-tier.service';

@Component({
  selector: 'cl-new-loyalty',
  templateUrl: './new-loyalty.component.html',
  styleUrls: ['./new-loyalty.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})

export class NewLoyaltyComponent implements OnInit, OnDestroy {
  public loyaltyId: string;
  public basicTierId: string;
  public form: FormGroup;
  public customTierDataSource: CustomDataSource<any>;
  public pools: any;
  public isEditPage: boolean = false;
  public showDraftButton: boolean = true;
  @ViewChild('stepper', {static: false}) private stepper: MatStepper;
  private loyaltyFormType: typeof LoyaltyStepForm = LoyaltyStepForm;
  protected destroy$: Subject<void> = new Subject();

  constructor(private loyaltyFormsService: LoyaltyFormsService,
              private loyaltyService: LoyaltyService,
              private customTierService: LoyaltyCustomTierService,
              private userService: UserService,
              private audiencesService: AudiencesService,
              private router: Router,
              private route: ActivatedRoute,
              private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.initPools();
    this.initForm();
    this.handleRouteParams();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public get currency$(): Observable<string> {
    return this.userService.currency$;
  }

  private initPools(): any {
    this.audiencesService.getAudiencesList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: any) => {
        this.pools = data;
      });
  }

  private getLoyaltyWithBasicTierRequest(): Observable<any> {
    return this.getLoyaltyRequest()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.getBasicTierRequest()),
        filter(Boolean)
      );
  }

  private getLoyaltyRequest(): Observable<any> {
    if (this.loyaltyId) {
      return this.loyaltyService.updateLoyalty(this.loyaltyId, this.form.value);
    }
    return this.loyaltyService.createLoyalty(this.form.value)
      .pipe(
        tap(loyalty => {
          this.loyaltyId = loyalty.id;
          this.form.get('createdAt').patchValue(loyalty.createdAt);
        })
      );
  }

  private getBasicTierRequest(): Observable<any> {
    if (this.basicTierId) {
      return this.loyaltyService.updateBasicTier(this.basicTierId, this.form.value, this.loyaltyId);
    }
    return this.loyaltyService.createBasicTier(this.form.value, this.loyaltyId)
      .pipe(
        tap(basicTier => this.setBasicTierId(basicTier.data.id))
      );
  }

  private setBasicTierId(basicTierId: string): void {
    this.basicTierId = basicTierId;
    this.initCustomTiersDataSource();
    this.setBasicTierIdToCustomTiersDataSourceFilter(this.loyaltyId);
  }

  public goNext(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.getLoyaltyWithBasicTierRequest()
      .subscribe(() => {
        // complete the current step
        this.stepper.selected.completed = true;
        // move to next step
        this.stepper.next();
      });
  }

  public saveAsDraft(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.getLoyaltyWithBasicTierRequest()
      .subscribe(() => {
        this.navigateToList();
      });
  }

  public launch(): void {
    this.loyaltyService.updateLoyaltyStatus(this.loyaltyId, 'active')
      .subscribe(() => {
        this.navigateToList();
      });
  }

  public cancel(): void {
    if (this.loyaltyId) {
      this.loyaltyService.deleteLoyalty(this.loyaltyId).subscribe(() => this.navigateToList());
      return;
    }
    this.navigateToList();
  }

  public navigateToList(): void {
    this.router.navigate(['/loyalty']);
  }

  public get stepOne(): FormGroup {
    return this.form.get(this.loyaltyFormType.details) as FormGroup;
  }

  public get stepTwo(): FormGroup {
    return this.form.get(this.loyaltyFormType.tiers) as FormGroup;
  }

  public get name(): AbstractControl {
    return this.form.get('name');
  }

  public get tiersCount(): AbstractControl {
    return this.form.get('tiersCount');
  }

  public get isLastStep(): boolean {
    return this.stepper && this.stepper.selectedIndex === this.stepper._steps.length - 1;
  }

  private initForm(): void {
    this.form = this.loyaltyFormsService.getFormLoyalty();
  }

  private getRefDialogSetupTier(data: any = null): Observable<MatDialogRef<TierSetupPopupComponent>> {
    const dialogRef: MatDialogRef<TierSetupPopupComponent> = this.dialog.open(TierSetupPopupComponent, {
      panelClass: 'tier-setup-dialog',
      data: {
        basicTierId: this.basicTierId,
        tier: data
      }
    });

    return dialogRef.afterClosed()
      .pipe(
        takeUntil(this.destroy$),
        filter(Boolean)
      );
  }

  private createCustomTire(): void {
    this.getRefDialogSetupTier()
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateCustomTiersDataSource());
  }

  private updateCustomTiersDataSource(): void {
    this.customTierDataSource.updateData();
    this.tiersCount.patchValue(this.customTierDataSource.length || 0);
  }

  private editCustomTire(data: any): void {
    this.getRefDialogSetupTier(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateCustomTiersDataSource());
  }

  private deleteCustomTier(id: any): void {
    this.customTierService.deleteCustomTier(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateCustomTiersDataSource());
  }

  // public addRule(): void {
  //   const dialogRef = this.dialog.open(AddRulePopupComponent);
  //
  //   dialogRef.afterClosed().subscribe(() => {
  //   });
  // }

  public handleLoyaltyActions(data: { action: NewLoyaltyActions, data?: any }): void {
    switch (data.action) {
      case NewLoyaltyActions.createTier:
        this.createCustomTire();
        break;
      case NewLoyaltyActions.editTier:
        this.editCustomTire(data.data);
        break;
      case NewLoyaltyActions.deleteTier:
        this.deleteCustomTier(data.data.id);
        break;
    }
  }

  private initCustomTiersDataSource(): void {
    if (!this.customTierDataSource) {
      this.customTierDataSource = new CustomDataSource<any>(this.customTierService);
    }
  }

  private setBasicTierIdToCustomTiersDataSourceFilter(basicTierId: string): void {
    this.customTierDataSource.filter = {program_id: basicTierId};
  }

  private handleRouteParams(): void {
    this.route.paramMap.pipe(
      takeUntil(this.destroy$),
      map((params: ParamMap) => params.get('id')),
      tap(id => {
        this.isEditPage = !!id;
        this.loyaltyId = id;
      }),
      switchMap(id => {
        if (id) {
          return this.loyaltyService.getLoyalty(id);
        }
        return of(null);
      }),
    ).subscribe(data => {
        if (data) {
          this.showDraftButton = data.status === 'draft';
          this.basicTierId = data.basicTierId || null;
          if (this.basicTierId) {
            this.setBasicTierId(this.basicTierId);
          }
          this.form.patchValue(data);
        } else {
          this.form.patchValue(this.getDefaultValue());
        }
      },
      (error: Error) => {
        console.warn(error.message);
        this.router.navigateByUrl('/loyalty');
      }
    );
  }

  private getDefaultValue(): any {
    return this.loyaltyFormsService.getDefaultValueForm();
  }
}
