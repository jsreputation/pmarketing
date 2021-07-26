import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  Pipe,
  PipeTransform,
  SimpleChanges
} from '@angular/core';
import { PERSIST_TIME } from '@perxtech/core';
import { interval, merge, NEVER, Observable, Subject } from 'rxjs';
import { map, scan, startWith, switchMap, takeUntil, tap } from 'rxjs/operators';
import { TimerType } from '../../quiz/models/quiz.model';

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
interface TimerState {
  count: boolean;
  countup: boolean;
  speed: number;
  value: number;
  increase: number;
}

@Component({
  selector: 'perx-core-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnInit, OnDestroy, AfterViewInit, OnChanges {
  @Input()
  public timeToRun: number = 3000; // input in milliseconds

  @Output()
  public done: EventEmitter<void> = new EventEmitter(); // will emit when time is up

  @Input('reset')
  public reset$: Observable<void>; // when ticking, the timer will reset and restart

  @Input()
  public countType: TimerType;

  @Input()
  public isPersistTime: boolean = false;

  // stream of formatted time values
  public timer$: Observable<string>;
  private destroy$: Subject<void> = new Subject();
  private resetSubject$: Subject<void> = new Subject();
  private startSubject$: Subject<void> = new Subject();
  private stopSubject$: Subject<void> = new Subject();
  public currentTimeValue: number;

  // refresh interval
  private INTERVAL: number = 100;

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.reset$ && changes.reset$.currentValue) {
      // forward reset ticks to resetSubject$
      this.reset$.subscribe(() => this.resetSubject$.next());
    }
  }

  public ngOnInit(): void {
    const timerStartValue = this.countType === TimerType.countUp ? 0 : this.timeToRun / this.INTERVAL;
    const reset: Observable<Partial<TimerState>> = this.resetSubject$.pipe(
      map(() => ({ value: timerStartValue, count: true }))
    );
    const start: Observable<Partial<TimerState>> = this.startSubject$.pipe(map(() => ({ count: true })));
    const stop: Observable<Partial<TimerState>> = this.stopSubject$.pipe(map(() => ({ count: false })));

    const timePersistTime = +(localStorage.getItem(PERSIST_TIME) || 0);

    const initState: TimerState = {
      count: false,
      speed: this.INTERVAL,
      value: this.isPersistTime ? (timePersistTime || timerStartValue) : timerStartValue,
      countup: this.countType === TimerType.countUp ? true : false,
      increase: 1
    };

    this.timer$ = merge(
      reset,
      start,
      stop
    ).pipe(
      startWith(initState),
      scan((state: TimerState, curr: Partial<TimerState>): TimerState => ({ ...state, ...curr }), {}),
      switchMap(
        (state: TimerState) =>
          state.count ?
            interval(state.speed)
              .pipe(
                tap(_ => state.value += state.countup ? state.increase : -state.increase),
                map(_ => {
                  this.currentTimeValue = state.value;
                  return state.value;
                })
              )
            : NEVER
      ),
      tap((ticks: number) => {
        if (this.countType === TimerType.countDown && ticks <= 0) {
          this.stopSubject$.next();
          this.done.emit();
        } else if (this.countType === TimerType.countUp && ticks >= this.timeToRun / this.INTERVAL) {
          this.stopSubject$.next();
          this.done.emit();
        }
      }),
      map((ticks: number) => this.ticksToString(ticks)),
      takeUntil(this.destroy$)
    );

    if (this.isPersistTime) {
      window.addEventListener('beforeunload',  (e: BeforeUnloadEvent) => {
        localStorage.setItem(PERSIST_TIME, this.currentTimeValue.toString());
        const confirmationMessage = 'Do you wanna refresh!';
        e.returnValue = confirmationMessage;
        return confirmationMessage;
      });
    }
  }

  public ngAfterViewInit(): void {
    this.startSubject$.next();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();

    if (this.isPersistTime && !this.currentTimeValue) {
      localStorage.removeItem(PERSIST_TIME);
    }
  }

  private ticksToString(ticks: number): string {
    // bcz start at 0 the emission
    const ellapasedTime = ticks * this.INTERVAL;
    // wont exceed the timetoRun, time + 1 so one stpe in afacance to close properly at 0.00,
    const date = new Date(ellapasedTime);

    const dateString = date.toLocaleTimeString('en-GB', {
      timeZone: 'UTC',
      minute: '2-digit',
      second: '2-digit'
    });
    return `${dateString}:${date.getUTCMilliseconds()}`;
  }
}
