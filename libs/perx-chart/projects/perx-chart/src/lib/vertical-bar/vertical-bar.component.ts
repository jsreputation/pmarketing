import { Component, Input } from '@angular/core';
import { Observable } from 'rxjs';
import { IData } from '../data.model';

@Component({
  selector: 'pc-vertical-bar',
  templateUrl: './vertical-bar.component.html',
  styleUrls: ['./vertical-bar.component.scss']
})
export class VerticalBarComponent {
  @Input()
  public data: Observable<IData>;
}
