import { Component, OnInit } from '@angular/core';
import { INavLink } from '../navlink.model';
import { NotificationService, PopupComponent } from '@perx/core';
import { MatDialog } from '@angular/material';

@Component({
  selector: 'app-utils',
  templateUrl: './utils.component.html',
  styleUrls: ['./utils.component.scss']
})
export class UtilsComponent implements OnInit {
  public navLinks: INavLink[] = [
    { path: 'pin-input', label: 'Pin Input' },
    { path: 'popup', label: 'Popup' }
  ];

  constructor(
    private notificationService: NotificationService,
    private dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.notificationService.$popup.subscribe(data => {
      this.dialog.open(PopupComponent, { data });
    });
  }
}
