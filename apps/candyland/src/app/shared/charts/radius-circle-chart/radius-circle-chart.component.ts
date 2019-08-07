import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cl-radius-circle-chart',
  templateUrl: './radius-circle-chart.component.html',
  styleUrls: ['./radius-circle-chart.component.scss']
})
export class RadiusCircleChartComponent implements OnInit {
  @Input() public imgPath = 'radius-circle-chart.png';
  constructor() { }

  public ngOnInit() {
  }

}
