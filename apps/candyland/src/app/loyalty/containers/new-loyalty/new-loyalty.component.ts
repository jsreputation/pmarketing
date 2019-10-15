import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { filter } from 'rxjs/operators';
import { TierSetupPopupComponent } from 'src/app/loyalty/containers/tier-setup-popup/tier-setup-popup.component';
import { LoyaltyFormsService } from '../../services/loyalty-forms.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { LoyaltyStepForm } from '../../models/loyalty-step-form.enum';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { UserService } from '@cl-core/services/user.service';
import { Observable } from 'rxjs';
import { AudiencesService } from '@cl-core-services';

@Component({
  selector: 'cl-new-loyalty',
  templateUrl: './new-loyalty.component.html',
  styleUrls: ['./new-loyalty.component.scss'],
  providers: [{
    provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError: true}
  }]
})
export class NewLoyaltyComponent implements OnInit, AfterViewInit, OnDestroy {
  public form: FormGroup;
  public pools: any;
  @ViewChild('stepper', {static: false}) private stepper: MatStepper;
  private loyaltyFormType: typeof LoyaltyStepForm = LoyaltyStepForm;

  constructor(private loyaltyFormsService: LoyaltyFormsService,
              private userService: UserService,
              private audiencesService: AudiencesService,
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
    this.stepper.next();
  }

  public save(): void {
    console.log(this.form.value);
  }

  public get stepOne(): AbstractControl {
    return this.form.get(this.loyaltyFormType.one);
  }

  public get stepTwo(): AbstractControl {
    return this.form.get(this.loyaltyFormType.two);
  }

  public get name(): AbstractControl {
    return this.form.get('name');
  }

  public get isLastStep(): boolean {
    return this.stepper && this.stepper.selectedIndex === this.stepper._steps.length - 1;
  }

  private initForm(): void {
    this.form = this.loyaltyFormsService.getFormLoyalty();
  }

  private addStepForm(step: string): void {
    if (this.checkExistingStepForm(this.form, step)) {
      return;
    }

    this.form.addControl(step, this.loyaltyFormsService.getStep(step));
    // console.log(this.form);
  }

  public createNewTier(): void {
    const dialogRef: MatDialogRef<TierSetupPopupComponent> = this.dialog.open(TierSetupPopupComponent, {panelClass: 'tier-setup-dialog'});

    dialogRef.afterClosed()
      .pipe(
        untilDestroyed(this),
        filter(Boolean)
      )
      .subscribe(() => {
        // this.form.get('merchantInfo').patchValue(id);
      });
  }

  public ngAfterViewInit(): void {
    this.addStepForm(this.getStepFormName(this.stepper.selectedIndex));
    if (this.stepper) {
      this.stepper.selectionChange
        .pipe(untilDestroyed(this))
        .subscribe((val) => {
          this.addStepForm(this.getStepFormName(val.selectedIndex));
        });
    }
  }

  private checkExistingStepForm(form: FormGroup, step: string): boolean {
    return this.loyaltyFormsService.checkExistingStepForm(form, step);
  }

  private getStepFormName(indexStep: number): string {
    return this.loyaltyFormsService.getStepName(indexStep);
  }

}
