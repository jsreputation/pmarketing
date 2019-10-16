import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'cl-report-header',
  templateUrl: './report-header.component.html',
  styleUrls: ['./report-header.component.scss']
})
export class ReportHeaderComponent {
  @Input() public title: string;
  @Output() public closePage: EventEmitter<boolean> = new EventEmitter<boolean>();

  public onClose(): void {
    this.closePage.emit(true);
  }
}
