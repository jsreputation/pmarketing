import { Directive, Output, EventEmitter, OnInit } from '@angular/core';

@Directive({
  selector: '[perxLoopDirective]'
})
export class OnLoopDirective implements OnInit {
  @Output()
  public loopItems: EventEmitter<Event> = new EventEmitter<Event>();

  public ngOnInit(): void {
    this.loopItems.emit();
  }

}
