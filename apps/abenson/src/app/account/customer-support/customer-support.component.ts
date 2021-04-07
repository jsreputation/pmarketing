import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CallUsComponent } from './call-us/call-us.component';

@Component({
  selector: 'app-customer-support',
  templateUrl: './customer-support.component.html',
  styleUrls: ['./customer-support.component.scss']
})
export class CustomerSupportComponent {
  constructor(private dialog: MatDialog) {}

  public openContacts(): void {
    this.dialog.open(CallUsComponent, { width: '30rem' });
  }
}
