import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter, switchMap, tap } from 'rxjs/operators';
import { TierSetupPopupComponent } from 'src/app/loyalty/containers/tier-setup-popup/tier-setup-popup.component';
import { LoyaltyFormsService } from '../../services/loyalty-forms.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { LoyaltyStepForm } from '../../models/loyalty-step-form.enum';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UserService } from '@cl-core/services/user.service';
import { Observable } from 'rxjs';
import { AudiencesService } from '@cl-core-services';
import { AddRulePopupComponent } from '../../components/add-rule-popup/add-rule-popup.component';
import { NewLoyaltyActions } from '../../models/new-loyalty-actions.enum';
import { LoyaltyService } from '@cl-core/services/loyalty.service';
import { Router } from '@angular/router';
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
export class NewLoyaltyComponent implements OnInit, AfterViewInit, OnDestroy {
  public loyaltyId: string;
  public loyaltyBasicTierId: string;
  public form: FormGroup;
  public customTierDataSource: CustomDataSource<any>;
  public pools: any;
  @ViewChild('stepper', {static: false}) private stepper: MatStepper;
  private loyaltyFormType: typeof LoyaltyStepForm = LoyaltyStepForm;

  constructor(private loyaltyFormsService: LoyaltyFormsService,
              private loyaltyService: LoyaltyService,
              private loyaltyCustomTierService: LoyaltyCustomTierService,
              private userService: UserService,
              private audiencesService: AudiencesService,
              private router: Router,
              private dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.initPools();
    this.initForm();
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

  public goNext(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.getLoyaltyRequest()
      .pipe(
        untilDestroyed(this),
        switchMap(() => this.getLoyaltyBasicTierRequest())
      )
      .subscribe(result => {
        if (result) {
          this.stepper.next();
        }
      });
  }

  private getLoyaltyRequest(): Observable<any> {
    if (this.loyaltyId) {
      return this.loyaltyService.updateLoyalty(this.loyaltyId, this.form.value);
    }
    return this.loyaltyService.createLoyalty(this.form.value)
      .pipe(
        tap(loyalty => this.loyaltyId = loyalty.data.id)
      );
  }

  private getLoyaltyBasicTierRequest(): Observable<any> {
    if (this.loyaltyBasicTierId) {
      return this.loyaltyService.updateLoyaltyBasicTier(this.loyaltyBasicTierId, this.form.value, this.loyaltyId);
    }
    return this.loyaltyService.createLoyaltyBasicTier(this.form.value, this.loyaltyId)
      .pipe(
        tap(loyaltyBasicTier => this.setBasicTierId(loyaltyBasicTier.data.id))
      );
  }

  private setBasicTierId(basicTierId: string): void {
    this.loyaltyBasicTierId = basicTierId;
    this.initCustomTiersDataSource();
    this.setBasicTierIdToCustomTiersDataSourceFilter(basicTierId);
  }

  public save(): void {
    console.log('save');
    this.loyaltyService.updateLoyaltyStatus(this.loyaltyId, 'active').subscribe(() => this.navigateToList());
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

  public get isLastStep(): boolean {
    return this.stepper && this.stepper.selectedIndex === this.stepper._steps.length - 1;
  }

  private initForm(): void {
    this.form = this.loyaltyFormsService.getFormLoyalty();
    // this.addStepForm(this.loyaltyFormType.details);
    // this.addStepForm(this.loyaltyFormType.tiers);
    // }

    // private addStepForm(step: string): void {
    //   if (this.checkExistingStepForm(this.form, step)) {
    //     return;
    //   }

    // this.form.addControl(step, this.loyaltyFormsService.getStep(step));
  }

  private getRefDialogSetupTier(data: any = null): Observable<MatDialogRef<TierSetupPopupComponent>> {
    const dialogRef: MatDialogRef<TierSetupPopupComponent> = this.dialog.open(TierSetupPopupComponent, {
      panelClass: 'tier-setup-dialog',
      data: {
        loyaltyBasicTierId: this.loyaltyBasicTierId,
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
      .subscribe(() => this.customTierDataSource.updateData());
  }

  private editCustomTire(data: any): void {
    this.getRefDialogSetupTier(data)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.customTierDataSource.updateData());
  }

  private deleteCustomTier(id: any): void {
    this.loyaltyCustomTierService.deleteLoyaltyCustomTier(id)
      .pipe(untilDestroyed(this))
      .subscribe(() => this.customTierDataSource.updateData());
  }

  public ngAfterViewInit(): void {
    // this.addStepForm(this.getStepFormName(this.stepper.selectedIndex));
    // if (this.stepper) {
    //   this.stepper.selectionChange
    //     .pipe(untilDestroyed(this))
    //     .subscribe((val) => {
    //       if (val.selectedIndex < 2) {
    //         this.addStepForm(this.getStepFormName(val.selectedIndex));
    //       }
    //     });
    // }
  }

  // private checkExistingStepForm(form: FormGroup, step: string): boolean {
  //   return this.loyaltyFormsService.checkExistingStepForm(form, step);
  // }

  // private getStepFormName(indexStep: number): string {
  //   return this.loyaltyFormsService.getStepName(indexStep);
  // }

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
      this.customTierDataSource = new CustomDataSource<any>(this.loyaltyCustomTierService);
    }
  }

  private setBasicTierIdToCustomTiersDataSourceFilter(basicTierId: string): void {
    this.customTierDataSource.filter = {'filter[program_id]': basicTierId};
  }
}
