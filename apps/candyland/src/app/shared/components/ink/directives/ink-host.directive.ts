import {
  Directive,
  ViewContainerRef,
} from '@angular/core';

@Directive({
  selector: '[clInkHost]'
})
export class InkHostDirective {
  constructor(private viewContainerRef: ViewContainerRef) {
  }

  public getHost(): any {
    return (this.viewContainerRef as any)._data.componentView.component || null;
  }
}
