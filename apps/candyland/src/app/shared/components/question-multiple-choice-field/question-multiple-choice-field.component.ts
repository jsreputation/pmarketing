import { Component, Input } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'cl-question-multiple-choice-field',
  templateUrl: './question-multiple-choice-field.component.html',
  styleUrls: ['./question-multiple-choice-field.component.scss']
})
export class QuestionMultipleChoiceFieldComponent {
  @Input() public group: FormGroup;

  public get choices(): FormArray {
    return (this.group.get('choices') as FormArray);
  }

  public removeControl(index: number): void {
    this.choices.removeAt(index);
  }

  public addedField(input: HTMLInputElement): void {
    this.choices.push(new FormControl(input.value, [Validators.required]));
    input.value = '';
  }

}
