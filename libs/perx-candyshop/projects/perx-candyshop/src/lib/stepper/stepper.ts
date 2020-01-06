// tslint:disable:variable-name
import { Directionality } from '@angular/cdk/bidi';
import {
  CdkStep,
  CdkStepper,
  StepContentPositionState,
  STEPPER_GLOBAL_OPTIONS,
  StepperOptions, StepperSelectionEvent
} from '@angular/cdk/stepper';
import { AnimationEvent } from '@angular/animations';
import {
  AfterContentInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  forwardRef,
  Inject,
  Input,
  Optional,
  Output,
  QueryList,
  SkipSelf,
  TemplateRef,
  ViewChildren,
  ViewEncapsulation
} from '@angular/core';
import { FormControl, FormGroupDirective, NgForm } from '@angular/forms';
import { DOCUMENT } from '@angular/common';
import { ErrorStateMatcher } from '@angular/material/core';
import { Subject } from 'rxjs';
import { takeUntil, distinctUntilChanged } from 'rxjs/operators';

import { StepHeaderComponent } from './step-header';
import { StepLabelDirective } from './step-label';
import { stepperAnimations } from './stepper-animations';
import { StepperIconDirective, StepperIconContext } from './stepper-icon';

@Component({
  selector: 'cs-step',
  templateUrl: 'step.html',
  providers: [{provide: ErrorStateMatcher, useExisting: StepComponent}],
  encapsulation: ViewEncapsulation.None,
  exportAs: 'csStep',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepComponent extends CdkStep implements ErrorStateMatcher {
  /** Content for step label given by `<ng-template csStepLabel>`. */
  @ContentChild(StepLabelDirective, {static: false}) public stepLabel: StepLabelDirective;

  constructor(@Inject(forwardRef(() => StepperDirective)) public stepper: StepperDirective,
              @SkipSelf() public _errorStateMatcher: ErrorStateMatcher,
              @Optional() @Inject(STEPPER_GLOBAL_OPTIONS) public stepperOptions?: StepperOptions) {
    super(stepper, stepperOptions);
  }

  /** Custom error state matcher that additionally checks for validity of interacted form. */
  public isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const originalErrorState = this._errorStateMatcher.isErrorState(control, form);

    // Custom error state checks for the validity of form that is not submitted or touched
    // since user can trigger a form change by calling for another step without directly
    // interacting with the current form.
    const customErrorState = !!(control && control.invalid && this.interacted);

    return originalErrorState || customErrorState;
  }
}

@Directive({selector: '[csStepper]', providers: [{provide: CdkStepper, useExisting: StepperDirective}]})
export class StepperDirective extends CdkStepper implements AfterContentInit {
  /** The list of step headers of the steps in the stepper. */
  @ViewChildren(StepHeaderComponent) public _stepHeader: QueryList<StepHeaderComponent>;

  /** Steps that the stepper holds. */
  @ContentChildren(StepComponent) public _steps: QueryList<StepComponent>;

  /** Custom icon overrides passed in by the consumer. */
  @ContentChildren(StepperIconDirective) public _icons: QueryList<StepperIconDirective>;

  /** Event emitted when the current step is done transitioning in. */
  @Output() public readonly animationDone: EventEmitter<void> = new EventEmitter<void>();

  @Output() public readonly beforeSelectionChange: EventEmitter<StepperSelectionEvent> = new EventEmitter<StepperSelectionEvent>();

  /** Whether ripples should be disabled for the step headers. */
  @Input() public disableRipple: boolean;

  @Input() public disable: boolean;

  /** Consumer-specified template-refs to be used to override the header icons. */
  public _iconOverrides: { [key: string]: TemplateRef<StepperIconContext> } = {};

  /** Stream of animation `done` events when the body expands/collapses. */
  public _animationDone: Subject<AnimationEvent> = new Subject<AnimationEvent>();

  public ngAfterContentInit(): void {
    this._icons.forEach(({name, templateRef}) => this._iconOverrides[name] = templateRef);

    this._steps.changes.pipe(takeUntil(this._destroyed)).subscribe(() => this._stateChanged());

    this._animationDone.pipe(
      distinctUntilChanged((x, y) => x.fromState === y.fromState && x.toState === y.toState),
      takeUntil(this._destroyed)
    ).subscribe(event => {
      if ((event.toState as StepContentPositionState) === 'current') {
        this.animationDone.emit();
      }
    });
  }

  public clickHeaderLabel(newIndex: number): void {
    this.beforeSelectionChange.emit({
      selectedIndex: newIndex,
      previouslySelectedIndex: this.selectedIndex,
      selectedStep: this._steps.toArray()[newIndex],
      previouslySelectedStep: this._steps.toArray()[this.selectedIndex]
    });
  }
}

@Component({
  selector: 'cs-horizontal-stepper',
  exportAs: 'csHorizontalStepper',
  templateUrl: 'stepper-horizontal.html',
  styleUrls: ['stepper.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'cs-stepper-horizontal',
    '[class.cs-stepper-label-position-end]': 'labelPosition == "end"',
    '[class.cs-stepper-label-position-bottom]': 'labelPosition == "bottom"',
    'aria-orientation': 'horizontal',
    role: 'tablist'
  },
  animations: [stepperAnimations.horizontalStepTransition],
  providers: [
    {provide: StepperDirective, useExisting: HorizontalStepperComponent},
    {provide: CdkStepper, useExisting: HorizontalStepperComponent}
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HorizontalStepperComponent extends StepperDirective {
  /** Whether the label should display in bottom or end position. */
  @Input() public labelPosition: 'bottom' | 'end' = 'end';
  @Input() public selectedIndex: number;
}

@Component({
  selector: 'cs-vertical-stepper',
  exportAs: 'csVerticalStepper',
  templateUrl: 'stepper-vertical.html',
  styleUrls: ['stepper.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'cs-stepper-vertical',
    'aria-orientation': 'vertical',
    role: 'tablist'
  },
  animations: [stepperAnimations.verticalStepTransition],
  providers: [
    {provide: StepperDirective, useExisting: VerticalStepperComponent},
    {provide: CdkStepper, useExisting: VerticalStepperComponent}
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class VerticalStepperComponent extends StepperDirective {
  @Input() public selectedIndex: number;

  constructor(
    @Optional() dir: Directionality, changeDetectorRef: ChangeDetectorRef, elementRef?: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) _document?: any) {
    super(dir, changeDetectorRef, elementRef, _document);
    this._orientation = 'vertical';
  }
}
