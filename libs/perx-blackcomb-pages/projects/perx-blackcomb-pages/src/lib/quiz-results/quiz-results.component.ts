import { Component, Input } from '@angular/core';
import { IPoints } from '@perxtech/core';

@Component({
  selector: 'perx-blackcomb-pages-quiz-results',
  templateUrl: './quiz-results.component.html',
  styleUrls: ['./quiz-results.component.scss']
})
export class QuizResultsComponent {
  @Input()
  public results: IPoints[];

  public backgroundImgUrl: string;
  public title: string;
  public subTitle: string;

  public next(): void { }
}
