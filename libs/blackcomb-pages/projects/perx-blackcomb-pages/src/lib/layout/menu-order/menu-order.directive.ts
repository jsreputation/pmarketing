import { Directive, ElementRef, Input, OnInit } from "@angular/core";

@Directive({
  selector: '[order]',
})
export class SetMenuOrderDirective implements OnInit {
  @Input() order: number;

  constructor(private el: ElementRef) {
  }

  ngOnInit() {
    this.el.nativeElement.style.order = this.order;
  }
}
