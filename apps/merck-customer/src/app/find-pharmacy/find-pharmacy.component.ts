import { Component, OnInit } from '@angular/core';
import { LocationsService, ILocation } from '@perx/core';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';

@Component({
  selector: 'mc-find-pharmacy',
  templateUrl: './find-pharmacy.component.html',
  styleUrls: ['./find-pharmacy.component.scss']
})
export class FindPharmacyComponent implements OnInit {
  public locations: Observable<ILocation[]>;
  public tags: Observable<string[]>;
  public filters: string[];

  constructor(
    private locationsService: LocationsService,
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.locations = this.locationsService.getAll();
    this.locations = of(
      [
        {
          merchantId: 1,
          locationId: 1,
          name: 'Pharmacy Name',
          tags: ['1', '2'],
          address: 'Pharmacy Address',
          latitude: 0,
          longitude: 1,
          phone: '+852 3102 4028'
        },
        {
          merchantId: 1,
          locationId: 1,
          name: 'Pharmacy Name',
          tags: ['1', '2'],
          address: 'Pharmacy Address',
          latitude: 0,
          longitude: 1,
          phone: '+852 3102 4028'
        }
      ]
    );

    this.locationsService.getTags();
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '320px',
      data: {filters: this.filters}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.filters = result;
    });
  }

}
