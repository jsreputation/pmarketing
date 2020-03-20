import { Component, Input } from '@angular/core';
import { IPoints } from '../models/quiz.model';

@Component({
  selector: 'perx-core-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  @Input()
  public results: IPoints[];

  public secondsToString(d: number): string {
    if (d < 0) {
      return '';
    }
    const minutes: number = Math.floor(d / 60);
    let minutesStr = `${minutes}`.padStart(2, '0');
    let seconds = Math.floor(d - minutes * 60);
    let secondsStr = `${seconds}`.padStart(2, '0');
    return `${minutesStr}:${secondsStr}`;
  }
}
