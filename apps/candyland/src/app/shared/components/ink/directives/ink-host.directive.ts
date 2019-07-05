import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[clInkHost]'
})
export class InkHostDirective {
  @Input() public set clInkHost(host) {
    this.host = host;
  }

  private host: any;

  constructor() { }

  public getHost() {
    return this.host;
  }
}
