import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IData } from '@perx/chart';
import { multipleData, singleData } from '../mock';

@Component({
  selector: 'app-horizontal-bar',
  templateUrl: './horizontal-bar.component.html',
  styleUrls: ['./horizontal-bar.component.scss']
})
export class HorizontalBarComponent {
  public singleData: Observable<IData> = of(singleData);

  public multipleData: Observable<IData> = of(multipleData);
}
