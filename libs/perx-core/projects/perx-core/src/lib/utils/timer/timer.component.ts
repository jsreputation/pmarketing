import { Component, EventEmitter, Input, OnChanges, Output, Pipe, PipeTransform, SimpleChanges } from '@angular/core';
import { defer, of, Subject, timer, Observable } from 'rxjs';
import { finalize, map, repeatWhen, switchMap, takeUntil, tap } from 'rxjs/operators';

@Pipe({
  name: 'lengthForce',
}) // can make reusable by tasking in param the length
export class ForceLengthPipe implements PipeTransform {
  public transform(value: string | null = null, x: number): string | null {
    if (value && value.length > x) {
      return value.substr(0, x);
    }
    if (value && value.length < x) {
      return value.padEnd(x, '0');
    }
    return value;
  }
}

@Component({
  selector: 'perx-core-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnChanges {
  private INTERVAL: number = 100;
  private startTime!: number;

  @Input()
  public timeToRun: number = 3000; // input in milliseconds

  @Output()
  public questionDone: EventEmitter<{ timeTaken: number }> = new EventEmitter();

  @Input('reset')
  public reset$: Observable<void> = new Subject(); // jz for utility when questionID has changed and inform timeSrc

  public timer$: Observable<string>;

  private startAgain$: Subject<boolean> = new Subject<boolean>();
  // anyway -> should be countdown
  private timeSource$: Observable<string>;

  constructor() {
    this.timeSource$ = timer(0, this.INTERVAL)
      .pipe(
        map((time: number) => {
          const date = time === 0 ? new Date(this.INTERVAL) : new Date(0); // first one needs to be offset
          // wont exceed the timetoRun, time + 1 so one stpe in afacance to close properly at 0.00,
          if (this.timeToRun > (time + 1) * this.INTERVAL) {
            // bcz start at 0 the emission
            date.setUTCMilliseconds(this.timeToRun - ((time + 1) * this.INTERVAL));
          }
          const dateString = date.toLocaleTimeString('en-GB', {
            timeZone: 'UTC',
            minute: '2-digit',
            second: '2-digit'
          });
          // use a pipe instead ->
          // console.log(Number(dateString.split(':')[1] + `.${date.getUTCMilliseconds()}`).toFixed(2));
          return `${dateString}.${date.getUTCMilliseconds()}`;
        }),
        finalize(() => this.questionDone.emit({ timeTaken: Date.now() - this.startTime }))
      );
    this.timer$ = defer(() => timer(0, this.timeToRun)
      .pipe(
        tap((time) => {
          if (time === 0) {
            this.startTime = Date.now();
          }
        }),
        // because swithcmap runs it twice, for each emission, runn in 2 concurrent timers
        switchMap((time) => {
          if (time === 0) {
            return this.timeSource$;
          }
          return of('00:00:00');
          // return of(); // useless here, the logic is to only switchmap once for each timer$ kicked off
        }),
        takeUntil(this.reset$),
        repeatWhen(() => this.startAgain$)
      ));
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.reset$ && this.reset$) {
      this.reset$
        .subscribe(() => this.startAgain$.next(true));
    }
  }
}
