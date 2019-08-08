import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { IData } from '../data.model';

export enum CardType {
  pie = 'pie',
  advancedPi = 'advancedPie',
  gridPie = 'gridPie',
  horizontalBar = 'horizontalBar',
  verticalBar = 'verticalBar',
  line = 'line',
  map = 'map',
  trend = 'trend',
  calendarHeatmap = 'calendardHeatmap'
}

@Component({
  selector: 'pc-meta-card',
  templateUrl: './meta-card.component.html',
  styleUrls: ['./meta-card.component.scss']
})
export class MetaCardComponent implements OnChanges {
  @Input()
  public parameters: { [key: string]: string };
  @Input()
  public id: number;
  @Input()
  public cardType: CardType = CardType.verticalBar;

  public data: Observable<IData>;

  constructor(private dataService: DataService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.parameters || changes.id) {
      console.log(this);
      this.data = this.dataService.getData(this.id, this.parameters);
    }
  }
}
