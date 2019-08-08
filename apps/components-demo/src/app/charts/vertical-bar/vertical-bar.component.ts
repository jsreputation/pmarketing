import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IData } from '@perx/chart';
import { multipleData, singleData } from '../mock';

@Component({
  selector: 'app-vertical-bar',
  templateUrl: './vertical-bar.component.html',
  styleUrls: ['./vertical-bar.component.scss']
})
export class VerticalBarComponent {
  public singleData: Observable<IData> = of(singleData);

  public multipleData: Observable<IData> = of(multipleData);
}
