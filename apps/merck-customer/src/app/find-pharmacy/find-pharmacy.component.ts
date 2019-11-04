import {
  Component,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material';

import {
  Observable,
} from 'rxjs';
import {
  takeLast,
  share
  } from 'rxjs/operators';

import {
  LocationsService,
  ILocation,
  IMerchantsService,
  IMerchant,
} from '@perx/core';

import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';

import {
  PageAppearence,
  PageProperties,
  BarSelectedItem,
} from '../page-properties';

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
  public merchants: Observable<IMerchant[]>;
  public tags: ITag[];
  public filteredLocations: Observable<ILocation[]>;

  constructor(
    private locationsService: LocationsService,
    private dialog: MatDialog,
    private merchantService: IMerchantsService,
  ) { }

  public ngOnInit(): void {
    this.merchants = this.merchantService.getAllMerchants().pipe(
      takeLast(1),
      share()
    );

    this.locations = this.locationsService.getAllLocations(this.merchants);

    this.locationsService.getTags(this.merchants).subscribe((res) => {
      this.tags = res.map(tag => ({name: tag, isSelected: false}));
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
    this.locations = this.locationsService.getAllLocations(this.merchants, filteredTags);
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
