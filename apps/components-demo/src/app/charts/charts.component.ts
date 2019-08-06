import { Component } from '@angular/core';
import { INavLink } from '../navlink.model';

@Component({
  selector: 'app-charts',
  templateUrl: './charts.component.html',
  styleUrls: ['./charts.component.scss']
})
export class ChartsComponent {
  public navLinks: INavLink[] = [
    { path: 'vertical-bar', label: 'Vertical Bar' },
    { path: 'horizontal-bar', label: 'Horizontal Bar' },
    { path: 'line', label: 'Line' },
    { path: 'pie', label: 'Pie' },
    { path: 'advanced-pie', label: 'Advanced Pie' },
    { path: 'grid-pie', label: 'Pie Grid' },
    { path: 'trend', label: 'Trend' },
    { path: 'map', label: 'Map' },
    { path: 'heatmap', label: 'Calendar Heat map' },
  ];
}
