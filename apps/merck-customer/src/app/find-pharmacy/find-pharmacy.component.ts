import { Component, OnInit } from '@angular/core';
import { LocationsService, ILocation, IMerchantsService } from '@perx/core';
import { Observable, of } from 'rxjs';
import { MatDialog } from '@angular/material';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';
import { map } from 'rxjs/operators';
import { IMerchant } from '@perx/core/dist/perx-core/lib/merchants/models/merchants.model';

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
export class FindPharmacyComponent implements OnInit, PageAppearence {
  public key: string = `AIzaSyDdNa7j6XYHHzYbzQDGTn52Rfj-wDw7X7w`;
  public locations: Observable<ILocation[]>;
  public tags: ITag[];
  public filteredLocations: Observable<ILocation[]>;
  public headerFn: (location: ILocation) => Observable<string>;
  constructor(
    private locationsService: LocationsService,
    private dialog: MatDialog,
    private merchantService: IMerchantsService
  ) { }

  public ngOnInit(): void {
    this.headerFn = (location: ILocation) => location.merchantName ? of(location.merchantName) :
      location.merchantId ? this.merchantService.getMerchant(location.merchantId)
        .pipe(map((merchant: IMerchant) => merchant.name)) : of(location.name);
    this.locations = this.locationsService.getAllLocations();

    this.locationsService.getTags().subscribe((res) => {
      this.tags = res.map(tag => ({ name: tag, isSelected: false }));
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '35rem',
      data: { tags: this.tags }
    });

    dialogRef.afterClosed().subscribe(res => {
      if (typeof res !== 'object') {
        return;
      }
      this.tags = res;
      this.filterLocations();
    });
  }

  public filterLocations(): void {
    const filteredTags = this.tags.filter(tag => tag.isSelected).map(tag => tag.name);
    this.locations = this.locationsService.getAllLocations(filteredTags);
  }

  public getPageProperties(): PageProperties {
    return {
      header: true,
      backButtonEnabled: false,
      bottomSelectedItem: BarSelectedItem.SEARCH,
      pageTitle: ''
    };
  }
}
