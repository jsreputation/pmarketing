import { Directive, Input } from '@angular/core';

@Directive({
  selector: '[clInkHost]'
})
export class InkHostDirective {
  @Input() public set clInkHost (host) {
    this._host = host;
  }

  private _host: any;

  constructor() { }

  ngOnInit(): void {
  }

  public getHost() {
    return this._host;
  }
}
