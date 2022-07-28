import { Component, Input, OnInit } from '@angular/core';
import { IQuizScore } from '../models/quiz.model';
import { SecondsToStringPipe } from '../seconds-to-string.pipe';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'perx-core-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {
  @Input()
  public results: IQuizScore[];
  @Input()
  public timeConsumed: Observable<string>;

  constructor(
    private secondsToString: SecondsToStringPipe
  ) { }


  public ngOnInit(): void {
    if (!this.timeConsumed) {
      this.timeConsumed = of('You took {{time}} to answer this.');
    }
  }

  public getTimeConsumedLabel(timeInSeconds: number): Observable<string> {
    return this.timeConsumed.pipe(
      map(timeCosumedTxt => timeCosumedTxt.replace('{{time}}', this.secondsToString.transform(timeInSeconds)))
    );
  }
}
