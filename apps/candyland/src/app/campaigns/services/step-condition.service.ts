import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class StepConditionService {
  public stepConditions: { [key: string]: FormGroup } = {};

  public registerStepCondition(key: number | string, form: FormGroup): void {
    this.stepConditions[key.toString()] = form;
  }

  public getStepCondition(key: string): boolean {
    return key in this.stepConditions ? this.stepConditions[key].valid : false;
  }

  public getStepFormValue(key: string): boolean {
    return key in this.stepConditions ? this.stepConditions[key].value : {};
  }

  public nextEvent(currentStep: number | string): void {
    const form = this.stepConditions[currentStep] as FormGroup;
    if (form && form.invalid) {
      form.markAllAsTouched();
    }
  }
}
