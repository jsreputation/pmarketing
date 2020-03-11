import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IData } from '@perxtech/chart';
import { data } from '../map-mock';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  public data: Observable<IData> = of(data);
}
