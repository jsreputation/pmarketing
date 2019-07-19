import { Component, Input, OnInit } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { QuestionFormFieldService } from '@cl-shared/components/question-form-field/shared/services/question-form-field.service';

@Component({
  selector: 'cl-question-group-field',
  templateUrl: './question-group-field.component.html',
  styleUrls: ['./question-group-field.component.scss']
})
export class QuestionGroupFieldComponent implements OnInit {
  @Input() public group: FormGroup;
  @Input() public level: number;
  @Input() public currentIndex: number;
  constructor(private questionFormFieldService: QuestionFormFieldService) { }

  ngOnInit() {
  }

  public choseTypeQuestion(selectedTypeQuestion: string): void {
    this.addQuestion(selectedTypeQuestion);
  }

  public deleteQuestion(index: number): void {
    this.surveyQuestionGroup.removeAt(index);
  }

  public addQuestion(questionType: string): void {
    this.surveyQuestionGroup.push(this.createControlQuestion(questionType));
  }

  public get surveyQuestionGroup(): FormArray {
    return (this.group.get('questionGroup') as FormArray);
  }

  private createControlQuestion(questionType: string): FormGroup {
    return this.questionFormFieldService.createFormField(questionType);
  }
}
