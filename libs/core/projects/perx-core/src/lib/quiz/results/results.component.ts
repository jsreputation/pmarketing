import { Component, Input, OnInit } from '@angular/core';
import { IPoints } from '../models/quiz.model';
import { TranslateService } from '@ngx-translate/core';
import { SecondsToStringPipe } from '../seconds-to-string.pipe';

@Component({
  selector: 'perx-core-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input()
  public results: IPoints[];

  public timeConsumed: string;

  constructor(
    private translate: TranslateService,
    private secondsToString: SecondsToStringPipe
  ) { }


  public ngOnInit(): void {
    this.translate.get('QUIZ_TEMPLATE.QUESTION_TIME_TAKEN').subscribe((text) => {
      this.timeConsumed = text;
    });
  }

  public getTimeConsumedLabel(timeInSeconds: number): string {
    return this.timeConsumed.replace('{{time}}', this.secondsToString.transform(timeInSeconds));
  }
}
