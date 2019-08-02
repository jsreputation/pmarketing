import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IData } from '../data.model';

@Component({
  selector: 'pc-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  @Input()
  public data: Observable<IData>;
}
