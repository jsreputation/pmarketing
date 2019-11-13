import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[csInkHost]'
})
export class InkHostDirective {
  @Input() public set clInkHost(host: any) {
    this.host = host;
  }

  private host: any;

  public getHost(): any {
    return this.host;
  }
}
