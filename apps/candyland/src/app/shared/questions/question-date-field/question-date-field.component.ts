import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-question-date-field',
  templateUrl: './question-date-field.component.html',
  styleUrls: ['./question-date-field.component.scss']
})
export class QuestionDateFieldComponent {
  @Input() public group: FormGroup;
}
