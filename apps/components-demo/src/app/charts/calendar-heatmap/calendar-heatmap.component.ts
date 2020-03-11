import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IData } from '@perxtech/chart';
import { data } from '../heatmap-mock';

@Component({
  selector: 'app-calendar-heatmap',
  templateUrl: './calendar-heatmap.component.html',
  styleUrls: ['./calendar-heatmap.component.scss']
})
export class CalendarHeatmapComponent {
  public data: Observable<IData> = of(data);
}
