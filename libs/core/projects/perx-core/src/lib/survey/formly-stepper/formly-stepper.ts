import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { MatHorizontalStepper } from '@angular/material';

@Component({
  selector: 'formly-field-stepper',
  styleUrls: ['./formly-stepper.scss'],
  templateUrl: './formly-stepper.html'
})

export class FormlyFieldStepperComponent extends FieldType implements AfterViewInit {
  public constructor(private cd: ChangeDetectorRef) {
    super();
  }
  @ViewChild('stepper', {static: true})
  public stepper!: MatHorizontalStepper;

  public TOTAL_LENGTH!: number;

  public ngAfterViewInit(): void {
    // bcz inaccessible within [value] of progress bar, have to init here
    this.TOTAL_LENGTH = this.stepper.steps.length - 1;
    this.cd.detectChanges(); // prevent afterviewError
  }

  public isValid(field: FormlyFieldConfig): boolean {
    if (field && field.key && field.formControl) {
      return field.formControl.valid;
    }

    return Boolean(field && field.fieldGroup && field.fieldGroup.every(f => this.isValid(f)));
  }
}
