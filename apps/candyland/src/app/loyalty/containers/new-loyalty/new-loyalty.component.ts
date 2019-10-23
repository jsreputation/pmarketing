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
import Utils from '@cl-helpers/utils';
import { StatusLabel } from '@cl-helpers/status-label.enum';

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
  public customTierDataSource: CustomDataSource<ICustomTireForm>;
  public pools: IPools;
  public isEditPage: boolean = false;
  public showDraftButton: boolean = true;
  public prevFormValue: ILoyaltyForm;
  @ViewChild('stepper', {static: false}) private stepper: MatStepper;
  private loyaltyFormType: typeof LoyaltyStepForm = LoyaltyStepForm;
  protected destroy$: Subject<void> = new Subject();

  public get stepOne(): FormGroup {
    return this.form.get(this.loyaltyFormType.details) as FormGroup;
  }

  public get stepTwo(): FormGroup {
    return this.form.get(this.loyaltyFormType.tiers) as FormGroup;
  }

  public get name(): AbstractControl {
    return this.form.get('name');
  }

  public get customTiersCount(): AbstractControl {
    return this.form.get('customTiersCount');
  }

  public get isLastStep(): boolean {
    return this.stepper && this.stepper.selectedIndex === this.stepper._steps.length - 1;
  }

  public get currency$(): Observable<string> {
    return this.userService.currency$;
  }

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
    this.initCustomTiersDataSource();
    this.handleRouteParams().subscribe((loyalty: ILoyaltyForm) => {
        this.initLoyaltyData(loyalty);
      },
      (error: Error) => {
        console.warn(error.message);
        this.router.navigateByUrl('/loyalty');
      }
    );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public goNext(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.isNotChangedFormValue()) {
      // complete the current step
      this.stepper.selected.completed = true;
      // move to next step
      this.stepper.next();
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

    if (this.isNotChangedFormValue()) {
      this.navigateToList();
      return;
    }

    this.getLoyaltyWithBasicTierRequest()
      .subscribe(() => {
        this.navigateToList();
      });
  }

  public launch(): void {
    const currentStatus = this.form.get('status').value;
    if (currentStatus && currentStatus !== StatusLabel.DRAFT) {
      this.navigateToList();
      return;
    }

    this.loyaltyService.updateLoyaltyStatus(this.loyaltyId, StatusLabel.ACTIVE)
      .subscribe(() => {
        this.navigateToList();
      });
  }

  public cancel(): void {
    if (!this.loyaltyId) {
      this.navigateToList();
      return;
    }

    this.loyaltyService.deleteLoyalty(this.loyaltyId)
      .subscribe(() => this.navigateToList());

  }

  public navigateToList(): void {
    this.router.navigate(['/loyalty']);
  }

  public handleLoyaltyActions(data: { action: NewLoyaltyActions, data?: ICustomTireForm }): void {
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

  private initForm(): void {
    this.form = this.loyaltyFormsService.getFormLoyalty();
  }

  private getRefDialogSetupTier(data: ICustomTireForm = null): Observable<MatDialogRef<TierSetupPopupComponent>> {
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
    this.customTiersCount.patchValue(this.customTierDataSource.length || 0);
  }

  private editCustomTire(data: ICustomTireForm): void {
    this.getRefDialogSetupTier(data)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.updateCustomTiersDataSource());
  }

  private deleteCustomTier(id: string): void {
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

  private initCustomTiersDataSource(): void {
    if (!this.customTierDataSource) {
      this.customTierDataSource = new CustomDataSource<ICustomTireForm>(this.customTierService);
    }
  }

  private setBasicTierIdToCustomTiersDataSourceFilter(basicTierId: string): void {
    this.customTierDataSource.filter = {program_id: basicTierId};
  }

  private initPools(): void {
    this.audiencesService.getAudiencesList()
      .pipe(takeUntil(this.destroy$))
      .subscribe((data: IPools) => {
        this.pools = data;
      });
  }

  private getLoyaltyWithBasicTierRequest(): Observable<ILoyaltyForm> {
    return this.getLoyaltyRequest()
      .pipe(
        takeUntil(this.destroy$),
        switchMap(() => this.getBasicTierRequest()),
        filter(Boolean)
      );
  }

  private getLoyaltyRequest(): Observable<ILoyaltyForm> {
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

  private getBasicTierRequest(): Observable<IJsonApiPayload<IBasicTierApi>> {
    if (this.basicTierId) {
      return this.loyaltyService.updateBasicTier(this.basicTierId, this.form.value, this.loyaltyId);
    }
    return this.loyaltyService.createBasicTier(this.form.value, this.loyaltyId)
      .pipe(
        tap(basicTier => this.setBasicTierId(basicTier.data.id))
      );
  }

  private setBasicTierId(basicTierId: string): void {
    if (basicTierId && basicTierId !== this.basicTierId) {
      this.basicTierId = basicTierId;
      this.setBasicTierIdToCustomTiersDataSourceFilter(this.loyaltyId);
    }
  }

  private handleRouteParams(): Observable<ILoyaltyForm | null> {
    return this.route.paramMap
      .pipe(
        takeUntil(this.destroy$),
        map((params: ParamMap) => params.get('id')),
        switchMap(id => {
          if (id) {
            return this.loyaltyService.getLoyalty(id);
          }
          return of(null);
        }),
      );
  }

  private initLoyaltyData(loyalty: ILoyaltyForm): void {
    if (loyalty) {
      this.loyaltyId = loyalty.id;
      this.setBasicTierId(loyalty.basicTierId || null);
      this.prevFormValue = loyalty;
    }
    this.showDraftButton = !loyalty || loyalty.status === StatusLabel.DRAFT;
    this.isEditPage = !!this.loyaltyId;
    const patchData = loyalty || this.getDefaultValue();
    this.form.patchValue(patchData);
  }

  private getDefaultValue(): ILoyaltyForm {
    return this.loyaltyFormsService.getDefaultValueForm();
  }

  private isNotChangedFormValue(): boolean {
    const isNotChanged = Utils.isEqual(this.form.value, this.prevFormValue);
    if (!isNotChanged) {
      this.prevFormValue = this.form.value;
    }
    return isNotChanged;
  }
}
