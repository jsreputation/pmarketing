import {
  Component,
  Inject
} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { FeedItem } from '../feed-reader.service';
import { Router } from '@angular/router';
import { IRewardPopupConfig, RewardPopupComponent } from '../../campaign/reward-popup/reward-popup.component';

@Component({
  selector: 'perx-core--feed-item-popup',
  templateUrl: './feed-item-popup.component.html',
  styleUrls: ['./feed-item-popup.component.scss']
})
export class FeedItemPopupComponent {
  public showButton: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public item: FeedItem,
    public dialogRef: MatDialogRef<RewardPopupComponent>,
    private router: Router,
    @Inject(MAT_DIALOG_DATA) public data: IRewardPopupConfig
  ) {
    if (item.hideButton) {
      this.showButton = !item.hideButton;
    }
  }

  public goToItemLink(): void {
    if (this.item.link != null) {
      if (this.item.link.startsWith('/')) {
        this.router.navigateByUrl(this.item.link);
      }
      (window as any).open(this.item.link);
    }
  }
}
