import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, OnChanges, OnDestroy, SimpleChanges } from '@angular/core';
import { DataService } from '../data.service';
import {combineLatest, NEVER, Observable, of, Subject, Subscription, timer} from 'rxjs';
import { IData } from '../data.model';
import {startWith, takeUntil} from 'rxjs/operators';

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
  @Input()
  public reloadInterval: (number | null | undefined);

  public data: Observable<IData>;

  @Input()
  public showLoading: boolean = true;
  @Input()
  public showReload: boolean = false;

  private requestData$: Observable<IData>;
  private reloadInterval$: Observable<number>;
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
    this.showReload = false;
    this.cancelCurrentRequest();
    this.requestData$ = this.dataService.getData(this.id, this.parameters);

    if (this.reloadInterval) {
      this.reloadInterval$ = timer(0, this.reloadInterval); // should be forkjoined only conditionally for performance
      this.currentRequest =
        combineLatest(
          this.requestData$,
          this.reloadInterval$,
          NEVER.pipe(startWith(0)) // kick start the process and maintain the lifeline
        ).pipe(
          takeUntil(this.destroy$)
        ).subscribe(
          (arrayDataNum) => {
            this.data = of(arrayDataNum[0]);
            this.showLoading = false;
            this.cd.detectChanges();
          },
          () => {
            this.showLoading = false;
            this.showReload = true;
            this.cd.detectChanges();
          }
        );
    } else {
      this.currentRequest =
          this.requestData$.pipe(
            takeUntil(this.destroy$)
          ).subscribe(
            (data) => {
              this.data = of(data);
              this.showLoading = false;
              this.cd.detectChanges();
            },
            () => {
              this.showLoading = false;
              this.showReload = true;
              this.cd.detectChanges();
            }
          );
    }
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
