import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent {
  public status: string = ' ';
  public reset$: Subject<void> = new Subject();

  public reset(): void {
    this.status = ' ';
    this.reset$.next();
  }

  public done(): void {
    this.status = 'Time\'s up';
  }
}
