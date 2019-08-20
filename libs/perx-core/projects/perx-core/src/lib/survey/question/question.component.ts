import { Component, OnInit, Input } from '@angular/core';
import { IQuestion } from '../models/survey.model';

@Component({
  selector: 'perx-core-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent implements OnInit {

  @Input()
  public question: IQuestion;

  constructor() { }

  public ngOnInit(): void {
  }

}
