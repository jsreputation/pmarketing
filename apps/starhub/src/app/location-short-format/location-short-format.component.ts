import { Component, OnInit, Input } from '@angular/core';
import { ILocation, LocationsService, filterDuplicateLocations } from '@perx/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-location-short-format',
  templateUrl: './location-short-format.component.html',
  styleUrls: ['./location-short-format.component.scss']
})
export class LocationShortFormatComponent implements OnInit {

  public locations: ILocation[];

  public displayLocation$: Observable<ILocation>;

  @Input()
  public merchantId: number;
  @Input()
  public rewardId: number;

  constructor(
    private locationService: LocationsService
  ) { }

  public ngOnInit(): void {
    if (!this.merchantId) {
      return;
    }

    this.displayLocation$ = this.locationService.getFromMerchant(this.merchantId).pipe(
      map((locations: ILocation[]) => {
        this.locations = filterDuplicateLocations(locations);
        return locations[0];
      })
    );
  }
}
