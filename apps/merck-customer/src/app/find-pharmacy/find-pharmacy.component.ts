import { Component, OnInit } from '@angular/core';
import { LocationsService, ILocation } from '@perx/core';
import { Observable } from 'rxjs';
import { MatDialog } from '@angular/material';
import { FilterDialogComponent } from './filter-dialog/filter-dialog.component';
import { PageAppearence, PageProperties, BarSelectedItem } from '../page-properties';

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
  public locations: Observable<ILocation[]>;
  public tags: ITag[];
  public filteredLocations: Observable<ILocation[]>;

  constructor(
    private locationsService: LocationsService,
    private dialog: MatDialog
  ) { }

  public ngOnInit(): void {
    this.locations = this.locationsService.getAll();

    this.locationsService.getTags().subscribe((res) => {
      this.tags = res.map(tag => ({name: tag, isSelected: false}));
    });
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(FilterDialogComponent, {
      width: '35rem',
      data: {tags: this.tags}
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
    this.locations = this.locationsService.getAll(filteredTags);
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
