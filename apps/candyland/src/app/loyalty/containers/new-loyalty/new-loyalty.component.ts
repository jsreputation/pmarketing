import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter, map, switchMap, tap } from 'rxjs/operators';
import { TierSetupPopupComponent } from 'src/app/loyalty/containers/tier-setup-popup/tier-setup-popup.component';
import { LoyaltyFormsService } from '../../services/loyalty-forms.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { LoyaltyStepForm } from '../../models/loyalty-step-form.enum';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UserService } from '@cl-core/services/user.service';
import { Observable, of } from 'rxjs';
import { AudiencesService } from '@cl-core-services';
import { AddRulePopupComponent } from '../../components/add-rule-popup/add-rule-popup.component';
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
  }

  public get currency$(): Observable<string> {
    return this.userService.currency$;
  }

  private initPools(): any {
    this.audiencesService.getAudiencesList()
      .pipe(untilDestroyed(this))
      .subscribe((data: any) => {
        this.pools = data;
      });
  }

  private getLoyaltyWithBasicTierRequest(): Observable<any> {
    return this.getLoyaltyRequest()
      .pipe(
        untilDestroyed(this),
        switchMap(() => this.getBasicTierRequest()),
        filter(Boolean)
      );
  }

  private getLoyaltyRequest(): Observable<any> {
    console.log('getLoyaltyRequest', this.loyaltyId);
    if (this.loyaltyId) {
      return this.loyaltyService.updateLoyalty(this.loyaltyId, this.form.value);
    }
    return this.loyaltyService.createLoyalty(this.form.value)
      .pipe(
        tap(loyalty => this.loyaltyId = loyalty.data.id)
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
    console.log('setBasicTierId', this.basicTierId, this.customTierDataSource);
    this.initCustomTiersDataSource();
    console.log('setBasicTierId2', this.basicTierId, this.customTierDataSource);
    this.setBasicTierIdToCustomTiersDataSourceFilter(this.loyaltyId);
  }

  public goNext(): void {
    console.log(this.form.invalid, this.form.errors, this.form.value);
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
    console.log('saveAsDraft');
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
    console.log('save');
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
        untilDestroyed(this),
        filter(Boolean)
      );
  }

  private createCustomTire(): void {
    this.getRefDialogSetupTier()
      .pipe(untilDestroyed(this))
      .subscribe(() => this.updateCustomTiersDataSource());
  }

  private updateCustomTiersDataSource(): void {
    this.customTierDataSource.updateData();
    console.log('updateCustomTiersDataSource', this.tiersCount, this.customTierDataSource.length);
    this.tiersCount.patchValue(this.customTierDataSource.length || 0);
  }

  private editCustomTire(data: any): void {
    this.getRefDialogSetupTier(data)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.updateCustomTiersDataSource());
  }

  private deleteCustomTier(id: any): void {
    this.customTierService.deleteCustomTier(id)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.updateCustomTiersDataSource());
  }

  public addRule(): void {
    const dialogRef = this.dialog.open(AddRulePopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

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
    console.log('setBasicTierIdToCustomTiersDataSourceFilter', basicTierId);
    this.customTierDataSource.filter = {program_id: basicTierId};
  }

  private handleRouteParams(): void {
    this.route.paramMap.pipe(
      untilDestroyed(this),
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
          console.log('status', data.status);
          this.showDraftButton = data.status === 'draft';
          this.basicTierId = data.basicTierId || null;
          if (this.basicTierId) {
            this.setBasicTierId(this.basicTierId);
          }
          this.form.patchValue(data);
        } else {
          console.log('1', this.form.value);
          this.form.patchValue(this.getDefaultValue());
          console.log('2', this.form.value);
        }
        console.log('data', data, 'form', this.form.value, 'id', this.basicTierId);
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
