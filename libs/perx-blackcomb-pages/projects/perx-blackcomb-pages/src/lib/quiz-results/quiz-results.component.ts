import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data } from '@angular/router';
import { IPoints, SecondsToStringPipe } from '@perxtech/core';
import { filter, map } from 'rxjs/operators';
import { oc } from 'ts-optchain';

@Component({
  selector: 'perx-blackcomb-pages-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss']
})
export class QuizResultsComponent implements OnInit {
  public results: IPoints[] = [];

  public backgroundImgUrl: string = 'assets/quiz/background.png';

  constructor(private secondsToString: SecondsToStringPipe, private activatedRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    this.activatedRoute.data
      .pipe(
        filter((data: Data) => data.results),
        map((data: Data) => data.results)
      )
      .subscribe((res: IPoints[]) => this.results = res);
  }

  public get title(): string {
    const correctAnswers = this.results.reduce((sum, q) => sum + (q.point > 0 ? 1 : 0), 0);
    return `You got ${correctAnswers} out of ${this.results.length} questions correct!`;
  }

  public get subTitle(): string | null {
    const total = this.results.reduce((sum, q) => sum + oc(q).time(0), 0);
    if (total === 0) {
      return null;
    }
    return `You took a total of ${this.secondsToString.transform(total)}`;
  }

  public next(): void { }
}
