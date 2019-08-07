import { Directive, ElementRef, HostListener } from '@angular/core';
import { InkBarDirective } from '@cl-shared/components/ink/directives/ink-bar.directive';

@Directive({
  selector: '[clInkListener]'
})
export class InkListenerDirective {

  public inkBar: InkBarDirective;
  constructor(public el: ElementRef) {
  }

  @HostListener('click') public onMouseOver() {
    this.setPosition();
  }

  public setPosition(): void {
    if (this.inkBar) {
      this.inkBar.alignToElement(this.el.nativeElement);
    }
  }
}
