import { Component, Input } from '@angular/core';

@Component({
  selector: 'cl-horizontal-bar-chart',
  templateUrl: './horizontal-bar-chart.component.html',
  styleUrls: ['./horizontal-bar-chart.component.scss']
})
export class HorizontalBarChartComponent {
  @Input() public imgPath = 'horizontal-bar-chart.png';

}
