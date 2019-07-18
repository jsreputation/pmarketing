import { Component, Input, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'cl-question-rating-field',
  templateUrl: './question-rating-field.component.html',
  styleUrls: ['./question-rating-field.component.scss']
})
export class QuestionRatingFieldComponent implements OnInit {
  @Input() public group: FormGroup;
  constructor() { }

  ngOnInit() {
  }

  public get color(): AbstractControl {
   return this.group.get('selectColor');
  }

}
