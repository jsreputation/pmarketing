import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';
import { Observable, of, Subject, Subscription } from 'rxjs';
import { IData } from '../data.model';
import { takeUntil } from 'rxjs/operators';

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
  calendarHeatmap = 'calendarHeatmap'
}

@Component({
  selector: 'pc-meta-card',
  templateUrl: './meta-card.component.html',
  styleUrls: ['./meta-card.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MetaCardComponent implements OnChanges, OnDestroy {
  @Input()
  public parameters: { [key: string]: string };
  @Input()
  public id: number | string;
  @Input()
  public cardType: CardType = CardType.verticalBar;

  public data: Observable<IData>;

  @Input()
  public showLoading: boolean = true;
  @Input()
  public showReload: boolean = false;

  private currentRequest: Subscription;
  private destroy$: Subject<void> = new Subject<void>();

  public ct: typeof CardType = CardType;

  constructor(
    private dataService: DataService,
    private cd: ChangeDetectorRef
  ) {
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.parameters || changes.id) {
      this.loadData();
    }
  }

  public ngOnDestroy(): void {
    this.cd.detach();
    this.cancelCurrentRequest();
    this.destroy$.next();
    this.destroy$.complete();
  }

  private loadData(): void {
    this.showLoading = true;
    this.cancelCurrentRequest();
    this.currentRequest = this.dataService.getData(this.id, this.parameters)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data) => {
          this.data = of(data);
          this.showLoading = false;
          this.cd.detectChanges();
        },
        () => this.showReload = true,
      );
  }

  public reload(): void {
    this.showLoading = true;
    this.showReload = false;
    this.loadData();
  }

  private cancelCurrentRequest(): void {
    if (this.currentRequest) {
      this.currentRequest.unsubscribe();
    }
  }
}
