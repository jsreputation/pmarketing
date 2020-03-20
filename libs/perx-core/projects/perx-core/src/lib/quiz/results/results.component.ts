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
}
