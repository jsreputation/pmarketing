import { Injectable } from '@angular/core';
import {AbstractControl, FormBuilder} from "@angular/forms";

@Injectable({
  providedIn: 'root'
})
export class FormBuilderWithToggleService extends FormBuilder{
  config: any;
  context;
  public formChanged;

  constructor() {
    super()
  }

  public updateFormStructure() {
    this.formChanged = false;

    for (const conditionConfig of this.config) {
      // console.log('conditionConfig', conditionConfig);
      this.toggleControls(conditionConfig);
    }
  }

  private toggleControls(config: {condition: any, controls: AbstractControl[], resetValue?: boolean}) {
    // console.log('toggleControls', config.condition.call(this.context));
    const condition =  config.condition.call(this.context);
    if (condition) {
      config.controls.forEach(control => this.enableControl(control));
    } else {
      config.controls.forEach(control => {
        this.disableControl(control, config.resetValue || false);
      });
    }
  }

  private enableControl(control: AbstractControl) {
    if (control.disabled && !(control.parent && control.parent.disabled)) {
      control.enable({emitEvent: false});
      // this.formChanged = true;
    }
  }

  private disableControl(control: AbstractControl, resetValue = false) {
    if (control.enabled) {
      control.disable({emitEvent: false});
      if (resetValue) {
        control.reset(null, {emitEvent: false});
      }
      // this.formChanged = true;
    }
  }

  private updateForm() {
    this.form.updateValueAndValidity();
    // this.cd.detectChanges();
  }

}
