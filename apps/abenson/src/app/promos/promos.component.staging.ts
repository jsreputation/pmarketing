import { Component, OnInit } from '@angular/core';
import { FeedItem, FeedReaderService } from '@perx/core';
import { MatDialog } from '@angular/material';
import { PopupComponent } from '../popup/popup.component';
import { Observable } from 'rxjs';

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
        items: this.reader.getFromUrl('https://teamplusrewards.home.blog/category/Exclusives-Staging/feed/', true)
      },
      {
        label: 'Promotions',
        items: this.reader.getFromUrl('https://teamplusrewards.home.blog/category/Promotions-Staging/feed/', true)
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
