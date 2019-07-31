import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cl-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.scss']
})
export class HorizontalBarChartComponent implements OnInit {
  @Input() public imgPath = 'horizontal-bar-chart.png';
  constructor() { }

  ngOnInit() {
  }

}
