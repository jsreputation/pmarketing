import { Component, Inject } from '@angular/core';
import { FeedItem } from '@perx/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'perx-blackcomb-pages--feed-item-popup',
  templateUrl: './feed-item-popup.component.html',
  styleUrls: ['./feed-item-popup.component.scss']
})
export class FeedItemPopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public item: FeedItem
  ) { }
}
