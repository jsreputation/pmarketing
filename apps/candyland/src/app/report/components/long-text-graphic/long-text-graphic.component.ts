import { Component, Input, OnChanges, OnInit } from '@angular/core';

@Component({
  selector: 'cl-long-text-graphic',
  templateUrl: './long-text-graphic.component.html',
  styleUrls: ['./long-text-graphic.component.scss']
})
export class LongTextGraphicComponent implements OnInit, OnChanges {
  @Input() public data: any;
  public showMessage: any[];
  public smallSize: boolean = true;
  public ngOnInit(): void {
    this.setShowMessage();
  }

  public ngOnChanges(): void {
    this.setShowMessage();
  }

  public switchShowMessages(): void {
    this.smallSize = !this.smallSize;
    this.smallSize ? this.setShowMessage() : this.setAllMessages();
  }

  private setAllMessages(): void {
    this.showMessage = this.data.payload;
  }

  private setShowMessage(): void {
    if (this.data && this.data.payload) {
      this.showMessage = this.data.payload.slice(0, 3);
    }
  }

}
