// tslint:disable:variable-name
import { FocusMonitor } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  ViewEncapsulation,
  TemplateRef
} from '@angular/core';
import { Subscription } from 'rxjs';
import { StepLabelDirective } from './step-label';
import { StepperIntl } from './stepper-intl';
import { StepperIconContext } from './stepper-icon';
import { CdkStepHeader, StepState } from '@angular/cdk/stepper';

@Component({
  selector: 'cs-step-header',
  templateUrl: 'step-header.html',
  styleUrls: ['step-header.scss'],
  // tslint:disable-next-line:no-host-metadata-property
  host: {
    class: 'cs-step-header',
    role: 'tab'
  },
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class StepHeaderComponent extends CdkStepHeader implements OnDestroy {
  private _intlSubscription: Subscription;

  /** State of the given step. */
  @Input() public state: StepState;

  /** Label of the given step. */
  @Input() public label: StepLabelDirective | string;

  /** Error message to display when there's an error. */
  @Input() public errorMessage: string;

  /** Overrides for the header icons, passed in via the stepper. */
  @Input() public iconOverrides: { [key: string]: TemplateRef<StepperIconContext> };

  /** Index of the given step. */
  @Input() public index: number;

  /** Whether the given step is selected. */
  @Input() public selected: boolean;

  /** Whether the given step label is active. */
  @Input() public active: boolean;

  /** Whether the given step is optional. */
  @Input() public optional: boolean;

  /** Whether the ripple should be disabled. */
  @Input() public disableRipple: boolean;

  constructor(
    public _intl: StepperIntl,
    private _focusMonitor: FocusMonitor,
    public _elementRef: ElementRef<HTMLElement>,
    changeDetectorRef: ChangeDetectorRef) {
    super(_elementRef);
    _focusMonitor.monitor(_elementRef, true);
    this._intlSubscription = _intl.changes.subscribe(() => changeDetectorRef.markForCheck());
  }

  public ngOnDestroy(): void {
    this._intlSubscription.unsubscribe();
    this._focusMonitor.stopMonitoring(this._elementRef);
  }

  /** Returns string label of given step if it is a text label. */
  public _stringLabel(): string | null {
    return this.label instanceof StepLabelDirective ? null : this.label;
  }

  /** Returns MatStepLabel if the label of given step is a template label. */
  public _templateLabel(): StepLabelDirective | null {
    return this.label instanceof StepLabelDirective ? this.label : null;
  }

  /** Returns the host HTML element. */
  public _getHostElement(): any {
    return this._elementRef.nativeElement;
  }

  /** Template context variables that are exposed to the `csStepperIcon` instances. */
  public _getIconContext(): StepperIconContext {
    return {
      index: this.index,
      active: this.active,
      optional: this.optional
    };
  }

  public _getDefaultTextForState(state: StepState): string {
    if (state === 'number') {
      return `${this.index + 1}`;
    }
    if (state === 'edit') {
      return 'create';
    }
    if (state === 'error') {
      return 'warning';
    }
    return state;
  }
}
