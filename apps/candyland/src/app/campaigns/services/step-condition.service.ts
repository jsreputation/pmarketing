import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable()
export class StepConditionService {
  private stepConditions: { [key: string]: FormGroup } = {};

  public registerStepCondition(key: number | string, form: FormGroup): void {
    this.stepConditions[key.toString()] = form;
  }

  public getStepCondition(key): boolean {
    return key in this.stepConditions ? this.stepConditions[key].valid : false;
  }

  public nextEvent(currentStep: number | string): void {
    const form = this.stepConditions[currentStep] as FormGroup;
    console.log('nextEvent');
    if (form && form.invalid) {
      console.log('markAllAsTouched');
      form.markAllAsTouched();
    }
  }
}
