import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { BadgeDetailPopupComponent, IBadge } from '@perxtech/core';

@Component({
  selector: 'perx-core-badge-list',
  templateUrl: './badge-list.component.html',
  styleUrls: ['./badge-list.component.scss'],
})
export class BadgeListComponent {
  @Input() public badges: IBadge[];

  constructor(private dialog: MatDialog, private translate: TranslateService, private router: Router) { }

  public viewBadgeDetail(badge: IBadge): void {
    this.translate.get('BADGES.VIEW_WALLET').subscribe(viewWallet => {
      this.dialog.open(BadgeDetailPopupComponent, {
        data: {
          title: badge.title,
          imageUrl: badge.image?.value.image_url,
          description: badge.description,
          buttonTxt: viewWallet,
          active: badge.active,
          afterClosedCallBack: this
        },
        minWidth: '35.5rem'
      });
    });
  }

  public dialogClosed(): void {
    this.router.navigate(['/wallet']);
  }
}
