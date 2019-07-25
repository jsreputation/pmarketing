import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-question-long-text-field',
  templateUrl: './question-long-text-field.component.html',
  styleUrls: ['./question-long-text-field.component.scss']
})
export class QuestionLongTextFieldComponent implements OnInit {
  @Input() public group: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
