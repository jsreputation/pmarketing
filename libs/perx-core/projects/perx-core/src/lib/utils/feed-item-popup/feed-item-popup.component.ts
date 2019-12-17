import {
  Component,
  Inject,
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { FeedItem } from '../feed-reader.service';

@Component({
  selector: 'perx-core--feed-item-popup',
  templateUrl: './feed-item-popup.component.html',
  styleUrls: ['./feed-item-popup.component.scss']
})
export class FeedItemPopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public item: FeedItem
  ) { }
}