import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'cl-new-survey-questions-page',
  templateUrl: './new-survey-questions-page.component.html',
  styleUrls: ['./new-survey-questions-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewSurveyQuestionsPageComponent implements OnInit {

  constructor() { }

  public ngOnInit() {
  }

}
