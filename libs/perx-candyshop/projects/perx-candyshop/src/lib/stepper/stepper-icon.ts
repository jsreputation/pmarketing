import {Directive, Input, TemplateRef} from '@angular/core';
import {StepState} from '@angular/cdk/stepper';

/** Template context available to an attached `csStepperIcon`. */
export interface StepperIconContext {
  /** Index of the step. */
  index: number;
  /** Whether the step is currently active. */
  active: boolean;
  /** Whether the step is optional. */
  optional: boolean;
}

/**
 * Template to be used to override the icons inside the step header.
 */
@Directive({
  selector: 'ng-template[csStepperIcon]',
})
export class StepperIconDirective {
  /** Name of the icon to be overridden. */
  @Input('csStepperIcon') public name: StepState;

  constructor(public templateRef: TemplateRef<StepperIconContext>) {}
}
