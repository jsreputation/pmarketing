import {AbstractControl} from '@angular/forms';

declare interface ToggleControlConfig {
  condition: boolean;
  controls: AbstractControl[];
  resetValue?: boolean;
}
