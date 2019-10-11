import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { LoyaltyFormsService } from '../../services/loyalty-forms.service';
import { AbstractControl, FormGroup } from '@angular/forms';
import { MatStepper } from '@angular/material/stepper';
import { LoyaltyStepForm } from '../../models/loyalty-stap-form';

@Component({
  selector: 'cl-new-loyalty',
  templateUrl: './new-loyalty.component.html',
  styleUrls: ['./new-loyalty.component.scss']
})
export class NewLoyaltyComponent implements OnInit, AfterViewInit {
  public form: FormGroup;
  @ViewChild('stepper', { static: false }) private stepper: MatStepper;
  private loyaltyFormType: typeof LoyaltyStepForm = LoyaltyStepForm;
  constructor(private loyaltyFormsService: LoyaltyFormsService) { }

  public ngOnInit(): void {
    this.initForm();
  }

  public goNext(): void {
    this.stepper.next();
  }

  public save(): void {
    console.log(this.form.value);
  }

  public get stepOne(): AbstractControl {
    return this.form.get(this.loyaltyFormType.one);
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
    // TODO: check if form contain the form step ignore it
    if (this.checkExistingStepForm(this.form, step)) {
      return;
    }
    console.log(step);
    this.form.addControl(step, this.loyaltyFormsService.getStep(step));
    console.log(this.form.value);
  }

  public ngAfterViewInit(): void {
    console.log(this.stepper);
    this.addStepForm(this.getStepFormName(this.stepper.selectedIndex));
    if (this.stepper) {
      console.log('asdfasdf', this.stepper);
      this.stepper.selectionChange
        .subscribe(val => {
          console.log('value selection', val);
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
