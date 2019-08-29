import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, of } from 'rxjs';
import { IData } from '../data.model';
// import { tap, catchError } from 'rxjs/operators';

export enum CardType {
  pie = 'pie',
  advancedPie = 'advancedPie',
  gridPie = 'gridPie',
  horizontalBar = 'horizontalBar',
  verticalBar = 'verticalBar',
  line = 'line',
  map = 'map',
  trend = 'trend',
  table = 'table',
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

  @Input()
  public showLoading: boolean = true;
  @Input()
  public showReload: boolean = false;

  constructor(private dataService: DataService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.parameters || changes.id) {
      this.loadData();
    }
  }

  private loadData(): void {
    this.showLoading = true;
    this.dataService.getData(this.id, this.parameters)
      .subscribe(
        (data) => this.data = of(data),
        () => this.showReload = true,
        () => this.showLoading = false
      );
  }

  public reload(): void {
    this.showLoading = true;
    this.showReload = false;

    this.data = this.dataService.getData(this.id, this.parameters);
    this.loadData();
  }
}
