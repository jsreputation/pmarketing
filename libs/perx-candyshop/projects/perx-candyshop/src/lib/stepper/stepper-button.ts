import {CdkStepperNext, CdkStepperPrevious} from '@angular/cdk/stepper';
import { Directive, Input } from '@angular/core';

/** Button that moves to the next step in a stepper workflow. */
@Directive({
  selector: 'button[csStepperNext]',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[type]': 'type',
  }
})
export class StepperNextDirective extends CdkStepperNext {
  @Input() public type: string;
}

/** Button that moves to the previous step in a stepper workflow. */
@Directive({
  selector: 'button[csStepperPrevious]',
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    '[type]': 'type',
  }
})
export class StepperPreviousDirective extends CdkStepperPrevious {
  @Input() public type: string;
}
