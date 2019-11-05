/// <reference types="@types/google.visualization" />

import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Observable } from 'rxjs';
import { IData } from '../data.model';

@Component({
  selector: 'pc-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnChanges {
  @Input()
  public data: Observable<IData>;

  private dataTable: (string | number)[][];

  public ngOnInit(): void {
    this.loadScript()
      .then(() => {
        google.charts.load('current', {
          packages: ['geochart'],
        });
        google.charts.setOnLoadCallback(this.drawMarkersMap.bind(this));
      });
  }

  public ngOnChanges(changes: SimpleChanges): void {
    if (!changes.data) {
      return;
    }
    this.data.subscribe((data: IData) => {
      this.dataTable = data.rows.map((row: (string | number)[]) =>
        // data conversion to markers mode format
        [
          +row[1], +row[2], row[0], row[3]
        ]
      );

      const firstRow = ['Lat', 'Lng', 'City', 'Revenue'];
      return this.dataTable.unshift(firstRow);
    });
  }

  private drawMarkersMap(): void {
    const options = {
      region: '142',
      displayMode: 'markers',
    };

    const div: HTMLDivElement = document.getElementById('chart_div') as HTMLDivElement;
    const chart = new google.visualization.GeoChart(div);
    if (this.dataTable && this.dataTable.length > 1) {
      const data = google.visualization.arrayToDataTable(this.dataTable);
      chart.draw(data, options);
    }
  }

  private loadScript(): Promise<void> {
    // don't load it more than once.
    if (typeof google !== 'undefined' &&
      typeof google.charts !== 'undefined' &&
      typeof google.visualization !== 'undefined') {
      return Promise.resolve();
    }

    const body: HTMLBodyElement = document.body as HTMLBodyElement;
    const script: HTMLScriptElement = document.createElement('script');
    const p = new Promise<void>((resolve) => {
      script.addEventListener('load', () => {
        resolve();
      });
    });
    script.innerHTML = '';
    const url = 'https://www.gstatic.com/charts/loader.js';

    script.src = url;
    script.async = true;
    script.defer = true;
    body.appendChild(script);
    return p;
  }
}
