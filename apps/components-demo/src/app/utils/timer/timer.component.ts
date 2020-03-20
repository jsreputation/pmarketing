import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  public reset$: Subject<boolean> = new Subject();
  public reset(): void {
    this.reset$.next(true);
    this.reset$.next(true);
  }
}
