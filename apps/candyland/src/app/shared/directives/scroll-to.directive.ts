import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';
import { Observable } from 'rxjs';

@Directive({
  selector: '[clScrollTo]'
})
export class ScrollToDirective implements AfterViewInit {
  @Input() public canRun: boolean;
  @Input() public classElement: string;
  @Input() public emit$: Observable<any>;
  @Input() public shiftTo: number = 100;
  private element: HTMLElement;
  constructor(private el: ElementRef) { }

  public ngAfterViewInit(): void {
    if (this.emit$) {
      this.emit$.subscribe(() => this.run());
    }
  }

  public run(): void {
    if (this.canRun) {
      this.setScroll(this.calcScroll());
    }
  }

  private calcScroll(): number {
    const container = this.el.nativeElement;
    this.element = container.querySelector(`.${this.classElement}`);
    if (this.element) {
      return this.element.offsetLeft - container.offsetLeft + this.shiftTo;
    }
    return 0;
  }

  private setScroll(scrollToX: number): void {
    this.element.scrollTo(scrollToX, 0);
  }

}
