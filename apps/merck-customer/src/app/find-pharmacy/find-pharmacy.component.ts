import { Component, OnInit } from '@angular/core';
import { LocationsService, ILocation } from '@perx/core';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';

export interface ITag {
  name: string;
  isSelected: boolean;
}

export interface IData {
  tags: ITag[];
}

@Component({
  selector: 'mc-find-pharmacy',
  templateUrl: './find-pharmacy.component.html',
  styleUrls: ['./find-pharmacy.component.scss']
})
export class FindPharmacyComponent implements OnInit {
  public locations: Observable<ILocation[]>;
  public tags: ITag[];
  public filteredLocations: Observable<ILocation[]>;

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
          tags: ['Drug', 'Medical Supply'],
          address: 'Pharmacy Address',
          latitude: 15.470044,
          longitude: 120.955672,
          phone: '+852 3102 4028'
        },
        {
          merchantId: 1,
          locationId: 1,
          name: 'Pharmacy Name',
          tags: ['Drug'],
          address: 'Pharmacy Address',
          latitude: 15.459698,
          longitude: 120.950294,
          phone: '+852 3102 4028'
        }
      ]
    );

    this.locationsService.getTags().subscribe((res) => {
      this.tags = res.map(tag => ({name: tag, isSelected: false}));
    });

    const tempDataTags = ['Drug', 'Medical Supply'];
    this.tags = tempDataTags.map(tag => ({name: tag, isSelected: false}));

  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '320px',
      data: {tags: this.tags}
    });

    dialogRef.afterClosed().subscribe(res => {
      if(typeof res != 'object') {
        return;
      }
      this.tags = res;
      this.filterLocations();
    });
  }

  public filterLocations(): void {
    // const filters = this.tags.filter(tag => tag.isSelected === true).map(tag => tag.name);
    // this.locations = this.locationsService.getAll(filters);
    console.log('filter applied');
  }
}
