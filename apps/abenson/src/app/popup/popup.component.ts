import { Component, Inject } from '@angular/core';
import { FeedItem } from '@perx/core';
import { MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public item: FeedItem
  ) { }
}
