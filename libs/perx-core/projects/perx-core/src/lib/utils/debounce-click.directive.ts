import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[perxCoreAppDebounceClick]'
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Input() public debounceTime = 500;
  @Output() public debounceClick = new EventEmitter();
  private clicks = new Subject();
  private subscription: Subscription;

  public ngOnInit(): void {
    this.subscription = this.clicks.pipe(
      debounceTime(this.debounceTime)
    ).subscribe(e => this.debounceClick.emit(e));
  }

  public ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  @HostListener('click', ['$event'])
  public clickEvent(event): void {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}
