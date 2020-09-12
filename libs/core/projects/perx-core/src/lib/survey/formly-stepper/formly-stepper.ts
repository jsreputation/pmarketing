import { AfterViewInit, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FieldType, FormlyFieldConfig } from '@ngx-formly/core';
import { SurveyService } from '../survey.service';
import { MatHorizontalStepper } from '@angular/material';
import { NotificationService } from '@perxtech/core';

@Component({
  selector: 'formly-field-stepper',
  styleUrls: ['./formly-stepper.scss'],
  templateUrl: './formly-stepper.html'
})

export class FormlyFieldStepperComponent extends FieldType implements AfterViewInit, OnInit {
  public constructor(
    private cd: ChangeDetectorRef,
    private surveyService: SurveyService,
    private notificationService: NotificationService
  ) {
    super();
  }
  @ViewChild('stepper', {static: true})
  public stepper!: MatHorizontalStepper;

  public TOTAL_LENGTH!: number;

  public ngOnInit() {
   this.stepper.selectionChange.subscribe(
     (change) => {
       // add 1 to ignore the Id
       const answerEntry = Object.entries(this.model)[
         change.previouslySelectedIndex === 0 ? change.previouslySelectedIndex + 1
           : change.previouslySelectedIndex]; // the first index in model is occupied by the moveId
       if (answerEntry) {
         this.surveyService.postSurveyAnswer(
           {
             questionId: answerEntry[0],
             content: answerEntry[1]
           },
           this.model.id,
         ).subscribe(() => {},
           (err) => {
             console.log(err);
             this.notificationService.addSnack('Error processing the answer.');
           });
       }
     }
   )
  }

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
