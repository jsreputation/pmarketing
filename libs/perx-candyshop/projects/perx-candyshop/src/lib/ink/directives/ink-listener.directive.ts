import { Directive, ElementRef, HostListener } from '@angular/core';
import { InkBarDirective } from './ink-bar.directive';

@Directive({
  selector: '[csInkListener]'
})
export class InkListenerDirective {

  public inkBar: InkBarDirective;

  constructor(public el: ElementRef) {
  }

  @HostListener('click')
  public onMouseOver(): void {
    this.setPosition();
  }

  public setPosition(): void {
    if (this.inkBar) {
      this.inkBar.alignToElement(this.el.nativeElement);
    }
  }
}
