import { AbstractControl } from '@angular/forms';

export interface ToggleControlConfig {
  condition: boolean;
  controls: AbstractControl[];
  resetValue?: boolean;
}
