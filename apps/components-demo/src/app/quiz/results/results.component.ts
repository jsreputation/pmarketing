import { Component } from '@angular/core';
import { IPoints } from '@perxtech/core';
import { results } from '../mock';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent {
  public get results(): IPoints[] {
    return results;
  }
}
