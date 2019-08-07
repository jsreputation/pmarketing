import { Component, Input } from '@angular/core';
import { FormArray, FormGroup } from '@angular/forms';
import { QuestionFormFieldService } from '@cl-shared/components/question-form-field/shared/services/question-form-field.service';
import { moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cl-question-group-field',
  templateUrl: './question-group-field.component.html',
  styleUrls: ['./question-group-field.component.scss']
})
export class QuestionGroupFieldComponent {
  @Input() public group: FormGroup;
  @Input() public level: number;
  @Input() public currentIndex: number;
  constructor(private questionFormFieldService: QuestionFormFieldService) { }

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

  public get listId(): string {
    const id = this.questionFormFieldService.listId;
    this.questionFormFieldService.listId = id;
    return id;
  }

  public updateQuestionType(data: {index: number, selectedTypeQuestion: string}): void {
    this.deleteQuestion(data.index);
    this.surveyQuestionGroup.insert(data.index, this.createControlQuestion(data.selectedTypeQuestion));
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
