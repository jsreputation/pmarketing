import {AbstractControl} from '@angular/forms';

declare interface ToggleControlConfig {
  condition: () => {};
  controls: AbstractControl[];
  resetValue?: boolean;
}
