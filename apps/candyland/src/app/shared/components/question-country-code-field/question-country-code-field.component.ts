import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-question-country-code-field',
  templateUrl: './question-country-code-field.component.html',
  styleUrls: ['./question-country-code-field.component.scss']
})
export class QuestionCountryCodeFieldComponent implements OnInit {
  @Input() group: FormGroup;
  constructor() { }

  ngOnInit() {
  }

}
