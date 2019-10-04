import { Component, Input } from '@angular/core';

@Component({
  selector: 'cl-radius-circle-chart',
  templateUrl: './radius-circle-chart.component.html',
  styleUrls: ['./radius-circle-chart.component.scss']
})
export class RadiusCircleChartComponent {
  @Input() public imgPath: string = 'radius-circle-chart.png';

}
