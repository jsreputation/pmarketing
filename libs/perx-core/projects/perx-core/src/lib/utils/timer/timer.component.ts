import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, Pipe, PipeTransform } from '@angular/core';
import { Observable, of, Subject, timer } from 'rxjs';
import { catchError, delay, map, repeatWhen, takeUntil } from 'rxjs/operators';

@Pipe({
  name: 'lengthForce',
}) // can make reusable by tasking in param the length
export class ForceLengthPipe implements PipeTransform {
  public transform(value: string | null = null, x: number): string | null {
    if (value === null) {
      return value;
    }
    if (value.length > x) {
      return value.substr(0, x);
    }
    return value.padEnd(x, '0');
  }
}

// @dynamic required to avoid error because of usage of lambda function in static method
@Component({
  selector: 'perx-core-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy {
  @Input()
  public timeToRun: number = 3000; // input in milliseconds

  @Output()
  public done: EventEmitter<void> = new EventEmitter(); // will emit when time is up

  @Input('reset')
  public reset$: Observable<void>; // when ticking, the timer will reset and restart

  // stream of formatted time values
  public timer$: Observable<string>;
  private destroy$: Subject<void> = new Subject();
  // refresh interval
  private INTERVAL: number = 100;

  public ngOnInit(): void {
    this.timer$ = this.timeSource()
      .pipe(
        // unfortunately we have to slightly delay the repeat, because we want to make sure that 
        // timeSource also had time to stop
        repeatWhen(() => this.reset$.pipe(delay(50))),
        takeUntil(this.destroy$)
      );
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private timeSource(): Observable<string> {
    return timer(0, this.INTERVAL)
      .pipe(
        map((ticks: number) => {
          // first one needs to be offset
          const date = ticks === 0 ? new Date(this.INTERVAL) : new Date(0);
          // bcz start at 0 the emission
          const ellapasedTime = (ticks + 1) * this.INTERVAL;
          // wont exceed the timetoRun, time + 1 so one stpe in afacance to close properly at 0.00,
          if (this.timeToRun > ellapasedTime) {
            date.setUTCMilliseconds(this.timeToRun - ellapasedTime);
          } else {
            throw 'done';
          }
          const dateString = date.toLocaleTimeString('en-GB', {
            timeZone: 'UTC',
            minute: '2-digit',
            second: '2-digit'
          });
          return `${dateString}:${date.getUTCMilliseconds()}`;
        }),
        catchError(() => {
          // when we reach the end, we notify any potential listener
          this.done.emit();
          return of('00:00:00');
        }),
        takeUntil(this.reset$)
      );
  }
}
