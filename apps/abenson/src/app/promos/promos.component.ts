import { Component, OnInit } from '@angular/core';
import { FeedItem, FeedReaderService } from '@perxtech/core';
import { MatDialog } from '@angular/material';
import { Observable } from 'rxjs';
import { PopupComponent } from '../popup/popup.component';

interface FeedItemGroup {
  label: string;
  items: Observable<FeedItem[]>;
}
@Component({
  selector: 'app-promos',
  templateUrl: './promos.component.html',
  styleUrls: ['./promos.component.scss']
})
export class PromosComponent implements OnInit {
  public itemsGroup$: FeedItemGroup[];
  constructor(
    private reader: FeedReaderService,
    private dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.itemsGroup$ = [
      {
        label: 'Exclusives',
        items: this.reader.getFromUrl('https://teamplusrewards.home.blog/category/Exclusives/feed/', true)
      },
      {
        label: 'Promotions',
        items: this.reader.getFromUrl('https://teamplusrewards.home.blog/category/Promotions/feed/', true)
      }
    ];
  }

  public readMore(item: FeedItem): void {
    this.dialog.open(PopupComponent, {
      panelClass: 'app-full-bleed-dialog',
      data: { ...item, description: item.descriptionWithURL, hideButton: true },
      height: '85vh',
      minWidth: '35.5rem',
      maxWidth: '94vw'
    });
  }
}
