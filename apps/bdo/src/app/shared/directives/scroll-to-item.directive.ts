import { Directive, ElementRef} from '@angular/core';

@Directive()
export class ScrollToItemDirective {
  protected GAP_ITEM = 13;

  goToItem(index: number, viewChild: ElementRef): void {
    const widthItem = document.querySelector('.item') as HTMLElement;
    const position = index * (this.GAP_ITEM + widthItem?.offsetWidth);
    viewChild.nativeElement.scrollLeft = position;
  }
}
