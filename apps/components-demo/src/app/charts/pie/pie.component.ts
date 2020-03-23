import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IData } from '@perxtech/chart';
import { singleData } from '../mock';

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.scss']
})
export class PieComponent {
  public singleData: Observable<IData> = of(singleData);
}
