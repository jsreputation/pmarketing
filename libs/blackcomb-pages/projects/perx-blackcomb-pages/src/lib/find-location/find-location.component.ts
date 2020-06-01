import { TranslateService } from '@ngx-translate/core';
import {
  Component,
  OnInit,
  OnDestroy,
} from '@angular/core';
import { MatDialog } from '@angular/material';

import {
  Observable,
  of,
  Subject
} from 'rxjs';
import {
  takeLast,
  share,
  map,
  takeUntil
} from 'rxjs/operators';

import {
  LocationsService,
  ILocation,
  IMerchantsService,
  IMerchant,
  LocationFilterPopupComponent
} from '@perxtech/core';

interface ITag {
  name: string;
  isSelected: boolean;
}

interface ILabels {
  filter: string;
  clearAll: string;
  categories: string;
  apply: string;
}

@Component({
  selector: 'perx-blackcomb-pages-find-locations',
  templateUrl: './find-location.component.html',
  styleUrls: ['./find-location.component.scss']
})
export class FindLocationComponent implements OnInit, OnDestroy {
  public key: string = 'AIzaSyDdNa7j6XYHHzYbzQDGTn52Rfj-wDw7X7w';
  public locations: Observable<ILocation[]>;
  public merchants: Observable<IMerchant[]>;
  public destroy$: Subject<void> = new Subject();
  public tags: ITag[] = [];
  public popupLables: ILabels;
  public filteredLocations: Observable<ILocation[]>;
  public headerFn: (location: ILocation) => Observable<string>;
  public viewLocationFn: () => Observable<string>;

  constructor(
    private locationsService: LocationsService,
    private dialog: MatDialog,
    private merchantService: IMerchantsService,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    this.headerFn = (location: ILocation) => location.merchantName ? of(location.merchantName) :
      location.merchantId ? this.merchantService.getMerchant(location.merchantId)
        .pipe(map((merchant: IMerchant) => merchant.name)) : of(location.name);
    this.viewLocationFn = () => this.translate.get('LOCATION_PAGE.VIEW_LOCATION');
    this.merchants = this.merchantService.getAllMerchants().pipe(
      takeLast(1),
      share()
    );

    this.locations = this.locationsService.getAllLocations(this.merchants).pipe(takeUntil(this.destroy$));

    this.locationsService.getTags(this.merchants).subscribe((res) => {
      this.tags = res.map(tag => ({ name: tag, isSelected: false }));
    });
  }

  public openDialog(): void {
    this.translate.get(this.tags.map(item => item.name)).subscribe((transTxt: any) => {
      this.tags = this.tags.map(tag => tag.name = transTxt[tag.name]);
      const dialogRef = this.dialog.open(LocationFilterPopupComponent, {
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
    });
  }

  public filterLocations(): void {
    const filteredTags = this.tags.filter(tag => tag.isSelected).map(tag => tag.name);
    this.locations = this.locationsService.getAllLocations(this.merchants, filteredTags);
  }
  public ngOnDestroy(): void {
    this.destroy$.next();
  }

}
