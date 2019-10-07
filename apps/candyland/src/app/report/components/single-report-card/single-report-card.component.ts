import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cl-single-report-card',
  templateUrl: './single-report-card.component.html',
  styleUrls: ['./single-report-card.component.scss']
})
export class SingleReportCardComponent implements OnInit {
  @Input() public data: any;
  @Input() public reportIndex: number;

  public ngOnInit(): void {
    console.log('cl-single-report-card', this.data);
  }
}
