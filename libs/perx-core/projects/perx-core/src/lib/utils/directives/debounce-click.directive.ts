import { Directive, EventEmitter, HostListener, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Directive({
  selector: '[perxCoreAppDebounceClick]'
})
export class DebounceClickDirective implements OnInit, OnDestroy {
  @Input() public debounceTime: number = 500;
  @Output() public debounceClick: EventEmitter<Event> = new EventEmitter<Event>();
  private clicks: Subject<Event> = new Subject<Event>();
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
  public clickEvent(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.clicks.next(event);
  }
}
