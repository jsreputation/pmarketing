import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAnswer, ISurvey } from '../models/survey.model';
@Component({
  selector: 'perx-core-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  @Input()
  public data: ISurvey;

  @Output()
  public totalLength: EventEmitter<number> = new EventEmitter();

  @Output()
  public currentPointer: EventEmitter<number> = new EventEmitter();

  @Output()
  public surveyDone: EventEmitter<IAnswer[]> = new EventEmitter();

  constructor() { }

  public ngOnInit(): void {
  }

  public completeSurvey(): void {
    this.surveyDone.emit();
  }
}
