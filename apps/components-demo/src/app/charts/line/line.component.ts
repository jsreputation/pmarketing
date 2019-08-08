import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IData } from '@perx/chart';
import { multipleData } from '../mock';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent {
  public view: number[] = [700, 400];

  public multipleData: Observable<IData> = of(multipleData);
}
