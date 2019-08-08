import {Injectable} from '@angular/core';
import {AbstractControl} from '@angular/forms';
import {ToggleControlConfig} from 'src/app/core/models/toggle-control-config.interface';

@Injectable({
  providedIn: 'root'
})
export class ToggleControlService {
  public formChanged: boolean;

  public updateFormStructure(config: any): void {
    this.formChanged = false;
    for (const conditionConfig of config) {
      this.toggleControls(conditionConfig);
    }
  }

  private toggleControls(config: ToggleControlConfig): void {
    const resetValue = ('resetValue' in config) && config.resetValue;
    if (config.condition) {
      config.controls.forEach((control: any) => this.enableControl(control));
    } else {
      config.controls.forEach((control: any) => {
        this.disableControl(control, resetValue);
      });
    }
  }

  private enableControl(control: AbstractControl): void {
    if (control.disabled && !(control.parent && control.parent.disabled)) {
      control.enable({emitEvent: false});
      this.formChanged = true;
    }
  }

  private disableControl(control: AbstractControl, resetValue: boolean = false): void {
    if (control.enabled) {
      if (resetValue) {
        control.reset(null, {emitEvent: false});
      }
      control.disable({emitEvent: false});
      this.formChanged = true;
    }
  }
}
