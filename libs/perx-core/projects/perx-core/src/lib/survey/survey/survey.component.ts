import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { IAnswer } from '../models/survey.model';
@Component({
  selector: 'perx-core-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {
  @Input()
  public config: any;

  @Output()
  public totalLength: EventEmitter<number> = new EventEmitter();

  @Output()
  public currentPointer: EventEmitter<number> = new EventEmitter();

  @Output()
  public surveyComplete: EventEmitter<IAnswer[]> = new EventEmitter();

  constructor() { }

  ngOnInit() {
  }

}
