import { Component } from '@angular/core';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {
  public navLinks = [
    { path: 'vertical-bar', label: 'Vertical Bar' },
    { path: 'horizontal-bar', label: 'Horizontal Bar' },
    { path: 'pie', label: 'Pie' },
    { path: 'advanced-pie', label: 'Advanced Pie' },
    { path: 'grid-pie', label: 'Pie Grid' },
    { path: 'trend', label: 'Trend' },
    { path: 'map', label: 'Map' },
    { path: 'heatmap', label: 'Heat map' },
  ];
}
