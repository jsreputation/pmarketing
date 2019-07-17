import { Directive, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[clOpenClose]'
})
export class OpenCloseDirective {
  private index: any;
  @Input() public set clOpenClose(val) {
    console.log(val);
    this.index = val;
  }

  constructor() { }

  @HostListener('click') public onClick() {
    console.log('click host', this.index);
  }
}
