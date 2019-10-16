import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { Observable, timer } from 'rxjs';
import { map, take } from 'rxjs/operators';

interface ITime {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}
@Component({
  selector: 'app-expire-timer',
  templateUrl: './expire-timer.component.html',
  styleUrls: ['./expire-timer.component.scss']
})
export class ExpireTimerComponent implements OnInit {
  public dateTime$: Observable<ITime[]>;

  @Input()
  public timerEndDate: Date;

  @Output()
  public hasExpired: EventEmitter<boolean> = new EventEmitter<boolean>();

  @Output()
  public isExpiring: EventEmitter<boolean> = new EventEmitter<boolean>();

  public ngOnInit(): void {

    if (!this.timerEndDate) {
      return;
    }

    const dateNow = new Date();
    const differenceTime = this.timerEndDate.valueOf() - dateNow.valueOf();
    const differenceInSeconds = differenceTime / 1000;
    const differenceInHours = differenceInSeconds / 60 / 60;
    let convertedtoSeconds = differenceInHours * 3600;
    const thirtySixHoursInSeconds = 129600;

    if (Math.round(convertedtoSeconds) <= 0) {
      this.hasExpired.emit(true);
      return;
    }

    if (convertedtoSeconds <= thirtySixHoursInSeconds) {
      this.isExpiring.emit(true);
      this.dateTime$ = timer(0, 1000).pipe(
        take(thirtySixHoursInSeconds),
        map(() => {
          const time = Date.parse(String(this.timerEndDate)) - (new Date()).getTime();
          const seconds = Math.floor( (time / 1000) % 60 );
          const minutes = Math.floor( (time / 1000 / 60) % 60 );
          const hours = Math.floor( (time / (1000 * 60 * 60)) % 24 );
          const days = Math.floor( time / ( 1000 * 60 * 60 * 24) );

          if (Math.round(convertedtoSeconds) <= 0) {
            this.hasExpired.emit(true);
            return;
          }
          convertedtoSeconds--;
          return [{
            days,
            hours,
            minutes,
            seconds
          }];
        })
      );
    }
  }

}
