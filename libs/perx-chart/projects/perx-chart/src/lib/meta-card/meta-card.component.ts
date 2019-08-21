import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';
import { Observable } from 'rxjs';
import { IData } from '../data.model';

export enum CardType {
  pie = 'pie',
  advancedPie = 'advancedPie',
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

  public showLoading: boolean = true;
  public showReload: boolean = false;

  constructor(private dataService: DataService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.parameters || changes.id) {
      this.data = this.dataService.getData(this.id, this.parameters);
      this.loadData();
    }
  }

  public loadData(): void {
    this.data.toPromise().then(() => {
      this.showLoading = false;
    }, () => {
      this.showLoading = false;
      this.showReload = true;
    });
  }

  public reload(): void {
    this.showLoading = true;
    this.showReload = false;

    this.data = this.dataService.getData(this.id, this.parameters);
    this.loadData();
  }
}
