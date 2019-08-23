import { ISurvey } from '@perx/core';
import { Component, OnInit } from '@angular/core';

import { mock } from './mock/survey-mock';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  public data: ISurvey;

  public ngOnInit(): void {
    this.data = mock;
  }
}
