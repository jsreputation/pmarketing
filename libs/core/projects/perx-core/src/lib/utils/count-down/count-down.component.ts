import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output
} from '@angular/core';

@Component({
  selector: 'perx-core-countdown-timer',
  template: '<p>{{message}}</p>'
})
export class CountDownComponent implements OnInit, OnDestroy {

  private intervalId: number = 0;
  @Input()
  public messageTemplate: string = '{seconds}';
  public message: string = '';
  @Input()
  public seconds: number = 0;
  @Output()
  public done: EventEmitter<void> = new EventEmitter(); // will emit when time is up

  public clearTimer(): void { clearInterval(this.intervalId); }

  public ngOnInit(): void {
    this.countDown();
  }

  public ngOnDestroy(): void {
    this.clearTimer();
  }

  private countDown(): void {
    this.clearTimer();
    this.intervalId = window.setInterval(() => {
      this.seconds -= 1;
      if (this.seconds === 0) {
        this.clearTimer();
        this.done.emit();
        this.message = '';
      } else {
        this.message = this.messageTemplate.replace('{seconds}', this.seconds.toString());
      }
    }, 1000);
  }
}
