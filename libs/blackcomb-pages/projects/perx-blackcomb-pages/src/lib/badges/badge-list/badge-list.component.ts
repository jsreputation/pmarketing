import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { BadgeDetailPopupComponent, IBadge } from '@perxtech/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'perx-core-badge-list',
  templateUrl: './badge-list.component.html',
  styleUrls: ['./badge-list.component.scss'],
})
export class BadgeListComponent {
  @Input() public badges: Observable<IBadge[]>;

  constructor(private dialog: MatDialog, private translate: TranslateService) { }

  public viewBadgeDetail(badge: IBadge): void {
    this.translate.get('BADGES.VIEW_WALLET').subscribe(viewWallet => {
      this.dialog.open(BadgeDetailPopupComponent, {
        data: {
          title: badge.title,
          imageUrl: badge.image.value.image_url,
          description: badge.description,
          buttonTxt: viewWallet
        },
        minWidth: '35.5rem'
      });
    });
  }
}
