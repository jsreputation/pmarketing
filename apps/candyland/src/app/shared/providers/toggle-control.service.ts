import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {ToggleControlConfig} from 'src/app/models/toggle-control-config.interface';

@Injectable({
  providedIn: 'root'
})
export class ToggleControlService {
  config: any;
  context;
  public formChanged;

  constructor() {
  }

  public updateFormStructure() {
    this.formChanged = false;
    for (const conditionConfig of this.config) {
      this.toggleControls(conditionConfig, this.context);
    }
  }

  private toggleControls(config: ToggleControlConfig, context) {
    const condition = config.condition.call(context);
    const resetValue = ('resetValue' in config) && config.resetValue;
    if (condition) {
      config.controls.forEach(control => this.enableControl(control));
    } else {
      config.controls.forEach(control => {
        this.disableControl(control, resetValue);
      });
    }
  }

  private enableControl(control: AbstractControl) {
    if (control.disabled && !(control.parent && control.parent.disabled)) {
      control.enable({emitEvent: false});
      this.formChanged = true;
    }
  }

  private disableControl(control: AbstractControl, resetValue = false) {
    if (control.enabled) {
      if (resetValue) {
        control.reset(null, {emitEvent: false});
      }
      control.disable({emitEvent: false});
      this.formChanged = true;
    }
  }

  // private updateForm() {
  //   this.form.updateValueAndValidity();
  // this.cd.detectChanges();
  // }

}
