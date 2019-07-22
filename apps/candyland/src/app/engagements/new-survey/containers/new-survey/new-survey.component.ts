import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { QuestionFormFieldService } from '@cl-shared/components/question-form-field/shared/services/question-form-field.service';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

export enum SurveyQuestionType {
  rating = 'rating',
  pictureChoice = 'pictureChoice',
  longText = 'longText',
  multipleChoice = 'multipleChoice',
  questionGroup = 'questionGroup',
  date = 'date',
  phone = 'phone'
}

@Component({
  selector: 'cl-new-survey',
  templateUrl: './new-survey.component.html',
  styleUrls: ['./new-survey.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSurveyComponent implements OnInit {
  public formSurvey: FormGroup;
  public surveyQuestionType: IEngagementType[];
  public level = 0;
  constructor(private fb: FormBuilder,
              private questionFormFieldService: QuestionFormFieldService,
              private cd: ChangeDetectorRef) {
    this.questionFormFieldService.cd = this.cd;
  }

  ngOnInit() {
    this.createSurveyForm();
  }

  public get listId(): string {
    const id = this.questionFormFieldService.listId;
    this.questionFormFieldService.listId = id;
    return id;
  }

  public get listDropConnectedTo(): string[] {
    return this.questionFormFieldService.listIdDrag;
  }

  public drop(event: any): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

  public get name(): AbstractControl {
    return this.formSurvey.get('name');
  }

  public get headlineMessage(): AbstractControl {
    return this.formSurvey.get('headlineMessage');
  }

  public get subHeadlineMessage(): AbstractControl {
    return this.formSurvey.get('subHeadlineMessage');
  }

  public get buttonText(): AbstractControl {
    return this.formSurvey.get('buttonText');
  }

  public save(): void {
    console.log('formSurvey.value', this.formSurvey.value);
  }

  public deleteQuestion(index: number) {
    this.surveyQuestion.removeAt(index);
  }

  public updateQuestionType(data: {index: number, selectedTypeQuestion: string}): void {
    this.deleteQuestion(data.index);
    this.surveyQuestion.insert(data.index, this.createControlQuestion(data.selectedTypeQuestion));
  }

  public choseTypeQuestion(selectedTypeQuestion: string): void {
    console.log(selectedTypeQuestion);
    this.addQuestion(selectedTypeQuestion);
    console.log(this.formSurvey.value);
  }

  public get surveyQuestion(): FormArray {
    return (this.formSurvey.get('questions') as FormArray);
  }

  public addQuestion(questionType: string): void {
    this.surveyQuestion.push(this.createControlQuestion(questionType));
  }

  private createControlQuestion(questionType: string): FormGroup {
    return this.questionFormFieldService.createFormField(questionType);
  }

  private createSurveyForm(): void {
    this.formSurvey = this.fb.group({
      name: ['Create Shake the Tree Template', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]
      ],
      headlineMessage: [null, [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)]
      ],
      subHeadlineMessage: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      questions: this.fb.array([]),
      background: [null, [Validators.required]],
      buttonText: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]]
    });
  }


}
