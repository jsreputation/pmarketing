import { Injectable, Optional, SkipSelf } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({providedIn: 'root'})
export class StepperIntl {
  /**
   * Stream that emits whenever the labels here are changed. Use this to notify
   * components if the labels have changed after initialization.
   */
  public readonly changes: Subject<void> = new Subject<void>();

  /** Label that is rendered below optional steps. */
  public optionalLabel: string = 'Optional';
}

// tslint:disable-next-line:typedef
export function CS_STEPPER_INTL_PROVIDER_FACTORY(parentIntl: StepperIntl) {
  return parentIntl || new StepperIntl();
}

export const CS_STEPPER_INTL_PROVIDER = {
  provide: StepperIntl,
  deps: [[new Optional(), new SkipSelf(), StepperIntl]],
  useFactory: CS_STEPPER_INTL_PROVIDER_FACTORY
};
