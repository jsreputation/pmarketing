/**
 * @license
 * Copyright Google LLC All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */

import {PortalModule} from '@angular/cdk/portal';
import {CdkStepperModule} from '@angular/cdk/stepper';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {ErrorStateMatcher, MatCommonModule, MatRippleModule} from '@angular/material/core';
import {MatIconModule} from '@angular/material/icon';
import {StepHeaderComponent} from './step-header';
import {StepLabelDirective} from './step-label';
import {HorizontalStepperComponent, StepComponent, StepperDirective, VerticalStepperComponent} from './stepper';
import {StepperNextDirective, StepperPreviousDirective} from './stepper-button';
import {StepperIconDirective} from './stepper-icon';
import {CS_STEPPER_INTL_PROVIDER} from './stepper-intl';

@NgModule({
  imports: [
    MatCommonModule,
    CommonModule,
    PortalModule,
    MatButtonModule,
    CdkStepperModule,
    MatIconModule,
    MatRippleModule,
  ],
  exports: [
    MatCommonModule,
    HorizontalStepperComponent,
    VerticalStepperComponent,
    StepComponent,
    StepLabelDirective,
    StepperDirective,
    StepperNextDirective,
    StepperPreviousDirective,
    StepHeaderComponent,
    StepperIconDirective,
  ],
  declarations: [
    HorizontalStepperComponent,
    VerticalStepperComponent,
    StepComponent,
    StepLabelDirective,
    StepperDirective,
    StepperNextDirective,
    StepperPreviousDirective,
    StepHeaderComponent,
    StepperIconDirective,
  ],
  providers: [CS_STEPPER_INTL_PROVIDER, ErrorStateMatcher],
})
export class StepperModule {}
