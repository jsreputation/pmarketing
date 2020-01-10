import { Component, OnInit, Input } from '@angular/core';
import { ILocation, LocationsService, filterDuplicateLocations } from '@perx/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-location-short-format',
  templateUrl: './location-short-format.component.html',
  styleUrls: ['./location-short-format.component.scss']
})
export class LocationShortFormatComponent implements OnInit {

  public locations$: Observable<ILocation[]>;

  public displayLocation$: Observable<ILocation>;

  @Input()
  public merchantId: number;

  public voucherId?: number;
  constructor(
    private locationService: LocationsService,
    private route: ActivatedRoute
  ) { }

  public ngOnInit(): void {
    if (!this.merchantId) {
      return;
    }
    this.route.queryParams.subscribe((param) => {
      this.voucherId = param.id;
    });
    this.locations$ = this.locationService.getFromMerchant(this.merchantId).pipe(map(filterDuplicateLocations));

    this.displayLocation$ = this.locations$.pipe(
      map(x => x[0])
    );
  }
}
