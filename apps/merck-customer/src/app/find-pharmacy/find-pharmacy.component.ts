import { Component, OnInit } from '@angular/core';
import { LocationsService, ILocation } from '@perx/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'mc-find-pharmacy',
  templateUrl: './find-pharmacy.component.html',
  styleUrls: ['./find-pharmacy.component.scss']
})
export class FindPharmacyComponent implements OnInit {
  public locations: Observable<ILocation[]>;

  constructor(
    private locationsService: LocationsService
  ) { }

  ngOnInit() {
    this.locations = this.locationsService.getAll();
    // this.locations = of(
    //   [
    //     {
    //       merchantId: 1,
    //       locationId: 1,
    //       name: 'Pharmacy Name',
    //       tags: ['1', '2'],
    //       address: 'Pharmacy Address',
    //       latitude: 0,
    //       longitude: 1,
    //       phone: '+852 3102 4028'
    //     },
    //     {
    //       merchantId: 1,
    //       locationId: 1,
    //       name: 'Pharmacy Name',
    //       tags: ['1', '2'],
    //       address: 'Pharmacy Address',
    //       latitude: 0,
    //       longitude: 1,
    //       phone: '+852 3102 4028'
    //     }
    //   ]
    // )
  }

}
