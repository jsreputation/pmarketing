import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { ILocation, LocationsService } from '@perx/core';
import { Observable } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
  styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit {
  public locations: Observable<ILocation[]>;

  constructor(
    private location: Location,
    private locationService: LocationsService,
    private activeRoute: ActivatedRoute
    ) {
  }

  public ngOnInit(): void {
    this.activeRoute.queryParams
      .pipe(
        filter((params: Params) => params.mid),
        map((params: Params) => params.mid)
      )
      .subscribe(
        (mid: number) => {
          this.locations = this.locationService.getFromMerchant(mid);
        }
      );
  }

  public back(): void {
    this.location.back();
  }
}
