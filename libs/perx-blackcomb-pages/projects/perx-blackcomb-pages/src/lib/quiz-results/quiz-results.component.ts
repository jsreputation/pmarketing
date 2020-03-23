import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params } from '@angular/router';
import { IPoints, SecondsToStringPipe } from '@perxtech/core';
import { merge } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';
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
    merge(this.activatedRoute.data, this.activatedRoute.params)
      .pipe(
        filter((data: Data | Params) => data.results),
        map((data: Data | Params) => data.results),
        map((res: IPoints[] | string) => {
          if (typeof res === 'string') {
            res = JSON.parse(res);
          }
          return res;
        }),
        tap(s => console.log(s)),
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
