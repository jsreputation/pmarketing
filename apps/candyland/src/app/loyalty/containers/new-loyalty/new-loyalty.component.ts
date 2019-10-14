import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { LoyaltyFormsService } from '../../services/loyalty-forms.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { LoyaltyStepForm } from '../../models/loyalty-stap-form';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { MatDialog } from '@angular/material/dialog';
import { AddRulePopupComponent } from '../../components/add-rule-popup/add-rule-popup.component';

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
  @ViewChild('stepper', { static: false }) private stepper: MatStepper;
  private loyaltyFormType: typeof LoyaltyStepForm = LoyaltyStepForm;
  constructor(private loyaltyFormsService: LoyaltyFormsService,
              public dialog: MatDialog) { }

  public ngOnInit(): void {
    this.initForm();
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

  public ngOnDestroy(): void {
  }

  addRule(): void {
    const dialogRef = this.dialog.open(AddRulePopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

}
