import { ISurvey } from '@perx/core';
import { Component, OnInit } from '@angular/core';

import { mock } from './mock/survey-mock';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit {

  public data: Observable<ISurvey>;

  public ngOnInit(): void {
    this.data = of(mock);
  }
}
