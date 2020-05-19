import {
  Component,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material';

import { FeedItem } from '../feed-reader.service';
import { Router } from '@angular/router';

@Component({
  selector: 'perx-core--feed-item-popup',
  templateUrl: './feed-item-popup.component.html',
  styleUrls: ['./feed-item-popup.component.scss']
})
export class FeedItemPopupComponent {
  public showButton: boolean = true;

  constructor(
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public item: FeedItem
  ) {
    if (item.hideButton) {
      this.showButton = !item.hideButton;
    }
  }

  public goToItemLink(): void {
    if (this.item.link != null) {
      this.router.navigateByUrl(this.item.link);
    }
  }
}
