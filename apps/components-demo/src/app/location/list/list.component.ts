import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ILocation, sortByDistance, GeoLocationService } from '@perx/core';
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
  public currentList: string = 'list1';

  constructor(private geoLocationService: GeoLocationService) {}

  public ngOnInit(): void {
    this.locations = of(test1);
    this.geoLocationService.positions().subscribe((position: Position) => {
      this.position = of(position);
      this.locations = sortByDistance(this.position, this.locations, this.sorting);
    });
  }

  public setValue(event: any): void {
    this.sorting = !!event.checked;
    this.locations = sortByDistance(this.position, this.locations, this.sorting);
  }
}
