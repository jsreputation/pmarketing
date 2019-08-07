import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cl-question-multiple-choice-field',
  templateUrl: './question-multiple-choice-field.component.html',
  styleUrls: ['./question-multiple-choice-field.component.scss']
})
export class QuestionMultipleChoiceFieldComponent {
  @Input() public group: FormGroup;
  constructor(private fb: FormBuilder) { }

  public get choice(): FormArray {
    return (this.group.get('choice') as FormArray);
  }

  public removeControl(index: number): void {
    this.choice.removeAt(index);
  }

  public addedField(input: HTMLInputElement): void {
    this.choice.push(this.fb.control(input.value, [Validators.required]));
    input.value = '';
  }

}
