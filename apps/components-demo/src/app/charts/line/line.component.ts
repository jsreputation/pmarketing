import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IData } from '@perxtech/chart';
import { multipleData } from '../mock';

@Component({
  selector: 'app-line',
  templateUrl: './line.component.html',
  styleUrls: ['./line.component.scss']
})
export class LineComponent {
  public multipleData: Observable<IData> = of(multipleData);
}
