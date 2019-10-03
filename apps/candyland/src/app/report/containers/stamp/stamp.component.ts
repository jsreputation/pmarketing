import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cl-stamp',
  templateUrl: './stamp.component.html',
  styleUrls: ['./stamp.component.scss']
})
export class StampComponent implements OnInit {
  public title: string = 'First Login Stamps Campaign Response';
  public data: any = {
    title: 'First Login Stamps Campaign Response',
    summaryInfo: [{
      title: 'Active Stamp Cards',
      value: 4.000
    }, {
      title: 'Engagement rate',
      value: '8%'
    }, {
      title: 'Average time to complete',
      value: '22.50'
    }],
  };
  constructor() { }

  ngOnInit() {
  }

  public onClose(): void {
    // TODO: close page;
  }

  private getReportStamp(): void {

  }

}
