import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ILocation, sortByDistance, GeoLocationService } from '@perxtech/core';
import { test1 } from '../mock';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public locations: Observable<ILocation[]>;

  private position: Observable<Position>;
  public sorting: boolean = true;

  constructor(private geoLocationService: GeoLocationService) { }

  public ngOnInit(): void {
    this.locations = of(test1);
    this.position = this.geoLocationService.positions();
    this.locations = sortByDistance(this.position, this.locations, this.sorting);
  }

  public setValue(event: any): void {
    this.sorting = !!event.checked;
    this.locations = sortByDistance(this.position, this.locations, this.sorting);
  }
}
